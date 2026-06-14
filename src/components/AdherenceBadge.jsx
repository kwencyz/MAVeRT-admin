import "../styles/components/_adherenceBadge.scss";

function AdherenceBadge({ percentage = 0 }) {
  const value = Math.min(Math.max(percentage, 0), 100);

  let statusClass = "red";

  if (value >= 100) statusClass = "green";
  else if (value >= 70) statusClass = "orange";

  return (
    <span
      className={`adherence-badge ${statusClass}`}
      aria-label={`Adherence ${value}%`}
    >
      {value}%
    </span>
  );
}

export default AdherenceBadge;