import axios from 'axios';
import localStorage from "redux-persist/es/storage";

export const API_URL = process.env.BASE_URL;

const api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('storage')}`;
    return config;
})

export default api;