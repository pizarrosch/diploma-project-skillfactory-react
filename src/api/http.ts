import axios from 'axios';
// import localStorage from "redux-persist/es/storage";

export const API_URL = process.env.BASE_URL;

const api = axios.create({
    withCredentials: false,
    baseURL: 'https://gateway.scan-interfax.ru',
    headers: {
        "Content-Type": 'application/json'
    }
})

api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
})

export default api;