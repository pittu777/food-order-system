import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/admin';

export const loginAdminUser = async (email, password) => {
  const response = await axios.post(`${API_BASE_URL}/admin-login`, { email, password });
  console.log(response.data)
  return response.data;
};

