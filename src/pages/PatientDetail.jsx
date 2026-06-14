import { useParams, useLocation } from "react-router-dom";
import ProgressChart from "../components/ProgressChart";
import { useEffect, useState } from "react";
import { getSessionHistory } from "../services/patientService";
import "../styles/pages/_patientDetail.scss";

function buildTrend(sessions) {
  if (!sessions?.length) return [];
  const sorted = [...sessions].sort((a, b) => new Date(a.date_recorded) - new Date(b.date_recorded));
  const origin = new Date(sorted[0].date_recorded);
  const byWeek = {};
  for (const s of sorted) {
    const days = Math.floor((new Date(s.date_recorded) - origin) / 86_400_000);
    const week = Math.floor(days / 7) + 1;
    if (!byWeek[week]) byWeek[week] = 0;
    if (s.is_completed) byWeek[week]++;
  }
  return Object.entries(byWeek).map(([week, completed]) => ({
    week: `Week ${week}`,
    adherence: Math.min(100, Math.round((completed / 3) * 100)),
  }));
}

function PatientDetail() {
  const { id } = useParams();
  const { state } = useLocation();
  const patientName = state?.name || `Patient #${id}`;

  const [history, setHistory] = useState(null);
  const [trendData, setTrendData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const hist = await getSessionHistory(id);
        setHistory(hist);
        setTrendData(buildTrend(hist.sessions));
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) return <div className="patient-detail"><p style={{ padding: 40 }}>Loading...</p></div>;

  const weeklyAdherence = history
    ? Math.min(100, Math.round((history.session_count / 3) * 100))
    : 0;

  return (
    <div className="patient-detail">

      <div className="patient-header">
        <div className="header-left">
          <h2>{patientName}</h2>
          <p className="subtitle">Clinical Monitoring Overview</p>
        </div>

        <div className="dashboard-cards">
          <div className="summary-card adherence">
            <p>Weekly Adherence</p>
            <h2>{weeklyAdherence}%</h2>
          </div>
          <div className="summary-card accuracy">
            <p>Weekly Sessions</p>
            <h2>{history?.session_count ?? 0} / 3</h2>
          </div>
          <div className="summary-card">
            <p>Weekly Minutes</p>
            <h2>{history?.weekly_minutes ?? 0}</h2>
          </div>
        </div>
      </div>

      <div className="section">
        <h3>Session History</h3>
        {!history?.sessions?.length ? (
          <p>No sessions recorded yet.</p>
        ) : (
          <table className="exercise-status-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Activities</th>
                <th>Minutes</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {history.sessions.map((s) => (
                <tr key={s.session_id}>
                  <td>{s.date_recorded}</td>
                  <td>{s.activities_done} / 8</td>
                  <td>{s.minutes_spent}</td>
                  <td>
                    <span className={`status-label ${s.is_completed ? "correct" : "incorrect"}`}>
                      {s.is_completed ? "Completed" : "In Progress"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="section">
        <h3>Progress Trend</h3>
        <div className="chart-container">
          <ProgressChart data={trendData} />
        </div>
      </div>

    </div>
  );
}

export default PatientDetail;
