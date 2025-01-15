import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/auth';

export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
  console.log(response.data)
  return response.data;
};

export const registerUser = async (username, email, password) => {
  const response = await axios.post(`${API_BASE_URL}/register`, { username, email, password });
  return response.data;
};
