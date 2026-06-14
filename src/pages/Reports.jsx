import { useEffect, useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "../styles/pages/_reports.scss";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { getPatients } from "../services/patientService";
import { getDailyReport, getWeeklyReport, weekInputToMonday } from "../services/reportService";
import { useAuth } from "../context/useAuth";

function Reports() {
  const reportRef = useRef();
  const { user } = useAuth();

  const [patients, setPatients] = useState([]);
  const [dailyData, setDailyData] = useState(null);
  const [weeklyData, setWeeklyData] = useState(null);

  const [selectedPatient, setSelectedPatient] = useState("");
  const [selectedPatientName, setSelectedPatientName] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedWeek, setSelectedWeek] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPatients().then(setPatients).catch(() => {});
  }, []);

  const handlePatientChange = (e) => {
    const id = e.target.value;
    setSelectedPatient(id);
    const found = patients.find((p) => String(p.id) === id);
    setSelectedPatientName(found?.name || "");
    setDailyData(null);
    setWeeklyData(null);
  };

  const generateReport = async (type) => {
    setError(null);

    if (!selectedPatient) { setError("Please select a patient."); return; }
    if (type === "daily" && !selectedDate) { setError("Please select a date."); return; }
    if (type === "weekly" && !selectedWeek) { setError("Please select a week."); return; }

    setLoading(true);
    try {
      if (type === "daily") {
        const data = await getDailyReport(selectedPatient, selectedDate);
        setDailyData(data);
        setWeeklyData(null);
      } else {
        const weekStart = weekInputToMonday(selectedWeek);
        const data = await getWeeklyReport(selectedPatient, weekStart);
        setWeeklyData(data);
        setDailyData(null);
      }
    } catch {
      setError("Report generation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const exportPDF = async () => {
    if (!reportRef.current) return;
    const canvas = await html2canvas(reportRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save(`MAVeRT-Report-${selectedPatientName || selectedPatient}.pdf`);
  };

  return (
    <div className="reports-page">
      <h2 className="page-title">Clinical Reports</h2>

      <div className="filters-container">
        <div className="filter-group">
          <select value={selectedPatient} onChange={handlePatientChange}>
            <option value="">Select Patient</option>
            {patients.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <button onClick={() => generateReport("daily")} disabled={loading}>
            Generate Daily
          </button>
        </div>

        <div className="filter-group">
          <input
            type="week"
            value={selectedWeek}
            onChange={(e) => setSelectedWeek(e.target.value)}
          />
          <button onClick={() => generateReport("weekly")} disabled={loading}>
            Generate Weekly
          </button>
        </div>
      </div>

      {error && <p className="error-text">{error}</p>}
      {loading && <LoadingSpinner />}

      <div ref={reportRef} className="report-document">
        <div className="report-header">
          <h3>MAVeRT Clinical Report</h3>
          <div className="meta">
            <span>Patient: {selectedPatientName || "-"}</span>
            <span>Date Generated: {new Date().toLocaleDateString()}</span>
            <span>Clinician: {user?.name || "—"}</span>
          </div>
        </div>

        {dailyData && (
          <div className="report-section">
            <h4>Daily Report — {dailyData.date}</h4>
            {!dailyData.session_found ? (
              <p className="no-data">No session recorded for this date.</p>
            ) : (
              <div className="report-result grid">
                <div className="metric">
                  <span>Session Completed</span>
                  <strong>{dailyData.session_completed ? "Yes" : "No"}</strong>
                </div>
                <div className="metric">
                  <span>Exercises Done</span>
                  <strong>{dailyData.exercises_done} / 8</strong>
                </div>
                <div className="metric">
                  <span>Time Spent</span>
                  <strong>{dailyData.time_spent_minutes} min</strong>
                </div>
                <div className="metric">
                  <span>Accuracy</span>
                  <strong>{dailyData.accuracy != null ? `${dailyData.accuracy}%` : "—"}</strong>
                </div>
              </div>
            )}
          </div>
        )}

        {weeklyData && (
          <div className="report-section">
            <h4>Weekly Report — w/c {weeklyData.week_start}</h4>
            <div className="report-result grid">
              <div className="metric">
                <span>Sessions Completed</span>
                <strong>{weeklyData.sessions_completed} / 3</strong>
              </div>
              <div className="metric">
                <span>Adherence</span>
                <strong>{weeklyData.adherence}%</strong>
              </div>
              <div className="metric">
                <span>Mean Accuracy</span>
                <strong>{weeklyData.mean_accuracy != null ? `${weeklyData.mean_accuracy}%` : "—"}</strong>
              </div>
              <div className="metric">
                <span>Total Minutes</span>
                <strong>{weeklyData.total_minutes}</strong>
              </div>
            </div>
          </div>
        )}
      </div>

      <button
        className="export-btn"
        onClick={exportPDF}
        disabled={!dailyData && !weeklyData}
      >
        Export Report PDF
      </button>
    </div>
  );
}

export default Reports;
