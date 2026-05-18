export const API_BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "https://synapseai-backend-zir2.onrender.com";

export const apiUrl = (path) => `${API_BASE_URL}${path}`;
