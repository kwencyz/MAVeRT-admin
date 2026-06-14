import "../styles/components/_insightPanel.scss";

function InsightPanel({ lowAdherencePatients = [] }) {

  if (!lowAdherencePatients.length) return null;

  const riskLevel =
    lowAdherencePatients.length > 5
      ? "High clinical risk detected"
      : "Moderate monitoring recommended";

  return (
    <div className="insight-panel">

      <h4>⚠ Clinical Monitoring Insight</h4>

      <p>{riskLevel}</p>

      <ul>
        {lowAdherencePatients.map(p => (
          <li key={p.id}>
            {p.name} — {p.weeklyAdherence}% adherence
          </li>
        ))}
      </ul>

    </div>
  );
}

export default InsightPanel;