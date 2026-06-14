import API from "./api";

export async function getPatients() {
  const { data: patients } = await API.get('/clinician/patients');

  const withAdherence = await Promise.all(
    patients.map(async (p) => {
      try {
        const { data: history } = await API.get(`/sessions/history/${p.patient_id}`);
        const weeklyAdherence = Math.min(100, Math.round((history.session_count / 3) * 100));
        return { id: p.patient_id, name: p.name, weeklyAdherence, startDate: p.start_date };
      } catch {
        return { id: p.patient_id, name: p.name, weeklyAdherence: 0, startDate: p.start_date };
      }
    })
  );

  return withAdherence;
}

export async function getSessionHistory(patientId) {
  const { data } = await API.get(`/sessions/history/${patientId}`);
  return data;
}
