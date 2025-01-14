import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { loginUser } from '../../api/authAPI';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const { token, user } = await loginUser(email, password);
  //     console.log("loggedin user", user)
  //     login(user, token); 
  //     navigate('/');
  //   } catch (err) {
  //     setError(err.response?.data?.message || 'Something went wrong');
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token, user } = await loginUser(email, password);
      console.log('API Response:', { token, user }); // Check if 'user' and 'token' are coming as expected
      login(user, token); // Pass user and token to login method
      navigate('/');
    } catch (err) {
      console.error('Login Error:', err);
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded w-full">
        Login
      </button>
    </form>
  );
};

export default Login;
