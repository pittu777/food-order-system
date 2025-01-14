import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
const NavBar = () => {
  const { isAuthenticated, user, logout } = useAuth(); // Accessing user authentication status and user info
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = ()=>{
    logout();
    navigate('/login');
  }

  return (
    <>
      <nav className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold decoration-none">
            🍔 FoodOrder
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6">
            <li>
              <Link to="/" className="hover:text-gray-300">Home</Link>
            </li>
            <li>
              <Link to="/menu" className="hover:text-gray-300">Menu</Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-gray-300">Cart</Link>
            </li>
            <li>
              <Link to="/orders" className="hover:text-gray-300">Orders</Link>
            </li>

            {/* Conditional rendering based on isAuthenticated */}
            {isAuthenticated ? (
              <li>
                <div className="flex items-center">
                  {/* User logo or profile */}
                  <span className="mr-2">Welcome, {user?.username}</span>
                  <button onClick={logout} className="hover:text-gray-300">Logout</button>
                </div>
              </li>
            ) : (
              <li>
                <Link to="/login" className="hover:text-gray-300">Login</Link>
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
          <ul className="md:hidden bg-gray-700 space-y-2 p-4">
            <li>
              <Link to="/" className="block hover:text-gray-300">Home</Link>
            </li>
            <li>
              <Link to="/menu" className="block hover:text-gray-300">Menu</Link>
            </li>
            <li>
              <Link to="/cart" className="block hover:text-gray-300">Cart</Link>
            </li>
            <li>
              <Link to="/orders" className="block hover:text-gray-300">Orders</Link>
            </li>

            {/* Conditional rendering based on isAuthenticated */}
            {isAuthenticated ? (
              <li>
                <button onClick={logout} className="block hover:text-gray-300">Logout</button>
              </li>
            ) : (
              <li>
                <Link to="/login" className="block hover:text-gray-300">Login</Link>
              </li>
            )}
          </ul>
        )}
      </nav>
    </>
  );
};

export default NavBar;
