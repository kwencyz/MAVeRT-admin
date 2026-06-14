import axios from "axios";

const API = axios.create({
  baseURL: "https://mavert-api-production.up.railway.app",
  // baseURL: "https://mavert-api-production.up.railway.app" || "http://localhost:3000/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
