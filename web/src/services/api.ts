import axios from 'axios';

const api = axios.create({
  baseURL:
    process.env.REACT_APP_SERVER_BASE_URL || 'https://my-fit.herokuapp.com',
});

export function setApiAuthToken(token: string): void {
  api.defaults.headers.Authorization = `Bearer ${token}`;
}

export default api;
