import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://giftology-backend.onrender.com/api/' || 'http://localhost:8000/api/';

export const api = axios.create({
    baseURL: API_BASE_URL,
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});