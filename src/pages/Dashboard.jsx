import { useEffect, useState } from "react";
import SummaryCard from "../components/SummaryCard";
import ProgressChart from "../components/ProgressChart";
import InsightPanel from "../components/InsightPanel";
import { usePatients } from "../hooks/usePatients";
import { getCohortTrend } from "../services/reportService";

function Dashboard() {
  const { patients, loading, error } = usePatients();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    getCohortTrend().then(setChartData).catch(() => {});
  }, []);

  if (loading) return <p style={{ padding: 40 }}>Loading dashboard...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  const lowAdherencePatients = patients.filter((p) => p.weeklyAdherence < 70);

  const avgAdherence = patients.length
    ? Math.round(patients.reduce((sum, p) => sum + p.weeklyAdherence, 0) / patients.length)
    : 0;

  return (
    <div className="dashboard-section">
      <div className="dashboard">
        <h2>MAVeRT Dashboard</h2>

        <InsightPanel lowAdherencePatients={lowAdherencePatients} />

        <div className="dashboard-cards">
          <SummaryCard title="Total Patients" value={patients.length} />
          <SummaryCard title="Low Adherence" value={lowAdherencePatients.length} />
          <SummaryCard title="Avg Adherence" value={`${avgAdherence}%`} />
          <SummaryCard title="Programme" value="3 sessions/week" />
        </div>

        <div className="dashboard-chart">
          <h3>Weekly Clinical Trend</h3>
          <div className="chart-container">
            {chartData.length > 0
              ? <ProgressChart data={chartData} />
              : <p style={{ color: "#9ca3af", padding: "20px 0" }}>No session data yet.</p>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
