import { Link } from "react-router-dom";
import AdherenceBadge from "./AdherenceBadge";
import "../styles/components/_patientTable.scss";

function PatientTable({ patients }) {
  return (
    <table className="patient-table">
      <thead>
        <tr>
          <th>Patient Name</th>
          <th>Programme</th>
          <th>Weekly %</th>
          <th>View</th>
        </tr>
      </thead>
      <tbody>
        {patients.map((p) => (
          <tr key={p.id}>
            <td>{p.name}</td>
            <td>3 sessions/week, 8 weeks</td>
            <td>
              <AdherenceBadge percentage={p.weeklyAdherence} />
            </td>
            <td>
              <Link to={`/patients/${p.id}`} state={{ name: p.name }}>View</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PatientTable;
