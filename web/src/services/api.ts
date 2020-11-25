import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_BASE_URL || 'http://localhost:3333',
});

export function setApiAuthToken(token: string): void {
  api.defaults.headers.Authorization = `Bearer ${token}`;
}

export default api;
