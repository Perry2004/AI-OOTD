import axios from "axios";

// Get the backend URL from environment variables or use localhost as fallback
const BACKEND_URL = import.meta.env.BACKEND_URL || "http://localhost";
const PORT = "3000";

// Create axios instance with base URL
const api = axios.create({
  baseURL: `${BACKEND_URL}:${PORT}`,
});

export default api;
