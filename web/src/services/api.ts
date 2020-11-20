import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export function setApiAuthToken(token: string): void {
  api.defaults.headers.Authorization = `Bearer ${token}`;
}

export default api;
