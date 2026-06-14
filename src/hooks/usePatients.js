import { useEffect, useState } from "react";
import { getPatients } from "../services/patientService";

export function usePatients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPatients = async () => {
    try {
      setLoading(true);

      const data = await getPatients();
      setPatients(data);
      setError(null);

    } catch {
      setError("Unable to load patient data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return {
    patients,
    loading,
    error,
    refresh: fetchPatients
  };
}