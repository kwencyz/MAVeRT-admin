import API from "./api";

export async function loginAdmin(email, password) {
  const { data } = await API.post("/admin/login", { email, password });
  return data; // expects { token, admin: { id, name, email } }
}

export async function registerAdmin(name, email, password) {
  const { data } = await API.post("/admin/register", { name, email, password });
  return data; // expects { token, admin: { id, name, email } }
}
