import "../styles/components/_summaryCard.scss";

function SummaryCard({ title, value, trend, variant }) {
  return (
    <div className={`summary-card ${variant || ""}`}>
      <div className="card-header">
        <p>{title}</p>
        {trend === "up" && <span className="trend up">↑</span>}
        {trend === "down" && <span className="trend down">↓</span>}
      </div>

      <h2>{value}</h2>
    </div>
  );
}

export default SummaryCard;