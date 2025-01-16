import React from 'react';
import FoodList from './FoodList';
import { useAuth } from '../../context/AuthContext';
import img1 from "../../assets/img1.jpeg";
import img2 from "../../assets/img2.jpeg";
import img3 from "../../assets/img3.jpeg";
import img4 from "../../assets/img4.jpeg"
const HomeComponent = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Welcome Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Welcome to Foodie's Paradise, {user?.username}!
        </h1>
        <p className="text-xl text-gray-600">
          Discover your favorite food and place an order today!
        </p>
      </div>

      {/* Categories Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Explore Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div className="bg-green-100 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center cursor-pointer">
            <img src={img1} alt="Pizza" className="w-32 h-32 object-cover rounded-full mb-4 mx-auto" />
            <p className="text-xl font-medium text-gray-800">Pizza</p>
          </div>
          <div className="bg-blue-100 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center cursor-pointer">
            <img src={img2} alt="Burgers" className="w-32 h-32 object-cover rounded-full mb-4 mx-auto" />
            <p className="text-xl font-medium text-gray-800">Burgers</p>
          </div>
          <div className="bg-red-100 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center cursor-pointer">
            <img src={img3} alt="Desserts" className="w-32 h-32 object-cover rounded-full mb-4 mx-auto" />
            <p className="text-xl font-medium text-gray-800">Desserts</p>
          </div>
          <div className="bg-yellow-100 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center cursor-pointer">
            <img src={img4} alt="Drinks" className="w-32 h-32 object-cover rounded-full mb-4 mx-auto" />
            <p className="text-xl font-medium text-gray-800">Drinks</p>
          </div>
        </div>
      </div>

      {/* Special Offers Section */}
      <div className="mb-12 bg-purple-100 p-8 rounded-xl shadow-lg text-center">
        <h3 className="text-2xl font-semibold text-purple-700 mb-4">Special Offers</h3>
        <p className="text-xl text-gray-800">Get 20% off on your first order! Use code: <span className="font-bold text-blue-600">WELCOME20</span></p>
      </div>

      {/* Recommended Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Recommended for You</h2>
        <FoodList />
      </div>

      {/* Food List Section */}
     

      {/* Footer Section */}
      <footer className="text-center text-gray-600 mt-12 border-t pt-6">
        <p>&copy; {new Date().getFullYear()} Foodie's Paradise. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomeComponent;
