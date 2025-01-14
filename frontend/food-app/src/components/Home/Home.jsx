import React from 'react'
import FoodList from './FoodList';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold mb-2">Welcome to Foodie's Paradise!</h1>
        <p className="text-lg text-gray-600">What would you like to order today?</p>
      </div>

     
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Explore Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-green-200 p-4 rounded-lg shadow text-center cursor-pointer">
            <img src="/images/pizza.jpg" alt="Pizza" className="rounded mb-2" />
            <p>Pizza</p>
          </div>
          <div className="bg-blue-200 p-4 rounded-lg shadow text-center cursor-pointer">
            <img src="/images/burgers.jpg" alt="Burgers" className="rounded mb-2" />
            <p>Burgers</p>
          </div>
          <div className="bg-red-200 p-4 rounded-lg shadow text-center cursor-pointer">
            <img src="/images/desserts.jpg" alt="Desserts" className="rounded mb-2" />
            <p>Desserts</p>
          </div>
          <div className="bg-yellow-200 p-4 rounded-lg shadow text-center cursor-pointer">
            <img src="/images/drinks.jpg" alt="Drinks" className="rounded mb-2" />
            <p>Drinks</p>
          </div>
        </div>
      </div>

      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Special Offers</h2>
        <div className="bg-purple-200 p-4 rounded-lg shadow">
          <p>Get 20% off on your first order! Use code: WELCOME20</p>
        </div>
      </div>

      {/* Recommended Dishes */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Recommended for You</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Add dish cards dynamically here */}
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <img src="/images/dish1.jpg" alt="Dish 1" className="rounded mb-2" />
            <p>Spaghetti Carbonara</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <img src="/images/dish2.jpg" alt="Dish 2" className="rounded mb-2" />
            <p>Cheeseburger Deluxe</p>
          </div>
        </div>
      </div>

      <FoodList/>

      {/* Footer */}
      <footer className="text-center text-gray-500 mt-8">
        <p>&copy; {new Date().getFullYear()} Foodie's Paradise. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;