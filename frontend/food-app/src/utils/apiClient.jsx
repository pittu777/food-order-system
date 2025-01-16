import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api/',
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});

export default apiClient;
