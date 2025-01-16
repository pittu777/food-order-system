import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const NavBar = () => {
  const { isAuthenticated, user, logout } = useAuth(); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');  
  }




  return (
    <>
     <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-5 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-3xl font-extrabold text-white hover:text-indigo-300 transition duration-300">
          🍔 FoodOrder
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-lg flex items-center">
          <li>
            <Link to="/" className="hover:text-indigo-300 transition duration-300">Home</Link>
          </li>
          <li>
            <Link to="/menu" className="hover:text-indigo-300 transition duration-300">Menu</Link>
          </li>
          <li>
            <Link to="/cart" className="hover:text-indigo-300 transition duration-300">Cart</Link>
          </li>
          <li>
            <Link to="/order-summary" className="hover:text-indigo-300 transition duration-300">Orders</Link>
          </li>

          {isAuthenticated ? (
            <li className="flex items-center space-x-2">
              <span className="text-lg font-semibold">Welcome, {user?.username}</span>
              <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300">Logout</button>
            </li>
          ) : (
            <li>
              <Link to="/login" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">Login</Link>
            </li>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <ul className="md:hidden bg-indigo-700 space-y-4 p-4 text-lg">
          <li>
            <Link to="/" className="block hover:text-indigo-300 transition duration-300">Home</Link>
          </li>
          <li>
            <Link to="/menu" className="block hover:text-indigo-300 transition duration-300">Menu</Link>
          </li>
          <li>
            <Link to="/cart" className="block hover:text-indigo-300 transition duration-300">Cart</Link>
          </li>
          <li>
            <Link to="/order-summary" className="block hover:text-indigo-300 transition duration-300">Orders</Link>
          </li>

          {isAuthenticated ? (
            <li>
              <button onClick={handleLogout} className="block w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300">Logout</button>
            </li>
          ) : (
            <li>
              <Link to="/login" className="block w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">Login</Link>
            </li>
          )}
        </ul>
      )}
    </nav>

    


          </>
  );
};

export default NavBar;
