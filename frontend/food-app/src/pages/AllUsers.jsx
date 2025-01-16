import React, { useEffect } from 'react';
import axios from 'axios';
import { useAdminState, useAdminDispatch } from '../context/AdminContext';
const AllUsers = () => {
  const { users } = useAdminState();
  const dispatch = useAdminDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/users', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        dispatch({ type: 'SET_USERS', payload: response.data });
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [dispatch]);

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      dispatch({ type: 'DELETE_USER', payload: id });
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
    <h3 className="text-2xl font-semibold text-center text-gray-800 mb-6">All Users</h3>
    <div className="max-w-4xl mx-auto">
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {users.map((user) => (
          <li
            key={user._id}
            className="p-4 bg-white shadow-md rounded-md border border-gray-200"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg font-medium text-gray-700">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <button
                onClick={() => handleDeleteUser(user._id)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:ring focus:ring-red-300 focus:outline-none"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
  );
};

export default AllUsers;
