import API from "./api";

export async function getCohortTrend() {
  const { data } = await API.get('/reports/cohort-trend');
  return data;
}

export async function getDailyReport(patientId, date) {
  const { data } = await API.get(`/reports/daily/${patientId}`, { params: { date } });
  return data;
}

export async function getWeeklyReport(patientId, weekStart) {
  const { data } = await API.get(`/reports/weekly/${patientId}`, { params: { start: weekStart } });
  return data;
}

// Convert "YYYY-Www" (from <input type="week">) to the ISO Monday date string
export function weekInputToMonday(weekStr) {
  const [yearStr, weekPart] = weekStr.split('-W');
  const year = parseInt(yearStr);
  const week = parseInt(weekPart);
  const jan4 = new Date(Date.UTC(year, 0, 4));
  const dow = jan4.getUTCDay() || 7;
  const monday = new Date(Date.UTC(year, 0, 4 + 1 - dow + (week - 1) * 7));
  return monday.toISOString().split('T')[0];
}
