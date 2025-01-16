import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';


const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-indigo-600 text-white py-4 shadow-md">
        <h2 className="text-3xl font-semibold text-center">Admin Dashboard</h2>
      </div>
      <div className="flex flex-col md:flex-row">
        
        <nav className="bg-gray-800 text-white w-full md:w-1/4 h-full md:min-h-screen p-4">
          <ul className="space-y-4">
            <li>
              <Link
                to="/users"
                className="block py-2 px-4 rounded hover:bg-indigo-500 transition-colors"
              >
                All Users
              </Link>
            </li>
            <li>
              <Link
                to="/foods"
                className="block py-2 px-4 rounded hover:bg-indigo-500 transition-colors"
              >
                All Food Items
              </Link>
            </li>
            <li>
              <Link
                to="/manage-products"
                className="block py-2 px-4 rounded hover:bg-indigo-500 transition-colors"
              >
                Manage Products
              </Link>
            </li>
            <li>
  <Link
    to="/delete-food-items"
    className="block py-2 px-4 rounded hover:bg-indigo-500 transition-colors"
  >
    Delete Food Items
  </Link>
</li>
<li>
  <Link
    to="/manage-orders"
    className="block py-2 px-4 rounded hover:bg-indigo-500 transition-colors"
  >
    manage orders
  </Link>
</li>
          </ul>
        </nav>

       
        
      </div>
    </div>
  );
};

export default AdminDashboard;