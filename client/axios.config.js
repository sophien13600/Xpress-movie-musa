import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000"
    // baseURL: "https://68dd16ec9e90d3f3ef2ac556--creative-piroshki-0a4759.netlify.app"
});

export default api;