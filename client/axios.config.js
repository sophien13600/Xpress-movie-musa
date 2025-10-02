import axios from "axios";

const resolveBaseURL = () => {
  if (import.meta.env?.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  return "http://localhost:5555";
};

const api = axios.create({
  baseURL: resolveBaseURL(),
});

export default api;
