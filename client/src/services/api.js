import axios from 'axios';
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://s76-nandhini-capstone-cityexplorer-4.onrender.com/api'
      : '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'An unexpected error occurred';
    toast.error(message);
    return Promise.reject(error);
  }
);
export default api;