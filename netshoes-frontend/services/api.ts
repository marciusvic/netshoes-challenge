import axios from 'axios';

const baseURL = 'https://localhost:3000/api/v1';

const api = axios.create({
  baseURL: baseURL,
});

export default api;
