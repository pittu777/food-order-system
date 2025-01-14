import React, { useState } from 'react';
import { registerUser } from '../../api/authAPI';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser(username, email, password);
      setMessage(data.message || 'Signup successful!');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <form onSubmit={handleSignup} className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>
      {message && <p className={`text-${message.includes('successful') ? 'green' : 'red'}-500`}>{message}</p>}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Username</label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">
        Signup
      </button>
    </form>
  );
};

export default Signup;