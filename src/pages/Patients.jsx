import { useEffect, useMemo, useState } from "react";
import PatientTable from "../components/PatientTable";
import { getPatients } from "../services/patientService";
import "../styles/pages/_patients.scss";

function Patients() {
  const [search, setSearch] = useState("");
  const [patients, setPatients] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const patientsPerPage = 5;

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await getPatients();
        setPatients(data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtered = useMemo(() => {
    return patients
      .filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      )
      // 🔥 Risk-first sorting
      .sort((a, b) => a.weeklyAdherence - b.weeklyAdherence);
  }, [patients, search]);

  const totalPages = Math.ceil(filtered.length / patientsPerPage);

  const currentPatients = filtered.slice(
    (page - 1) * patientsPerPage,
    page * patientsPerPage
  );

  if (loading) {
    return <div className="patients-loading">Loading patients...</div>;
  }

  return (
    <div className="patients-page">

      <div className="patients-header">
        <div>
          <h2>Patient Monitoring</h2>
          <p>{filtered.length} patients found</p>
        </div>

        <input
          placeholder="Search patient name..."
          value={search}
          onChange={e => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="search-input"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          No patients match your search.
        </div>
      ) : (
        <>
          <PatientTable patients={currentPatients} />

          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={page === i + 1 ? "active" : ""}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}

    </div>
  );
}

export default Patients;