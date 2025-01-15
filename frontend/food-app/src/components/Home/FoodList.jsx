import React, { useState, useEffect } from "react";
import { useFood } from "../../context/FoodContext";
import { useCart } from "../../context/CartContext";
import {toast} from "react-toastify";
const FoodList = () => {
  const { foods, loading, error, getFoods } = useFood(); 
  const {addToCart} = useCart();

  const handleAddToCart = (food) => {
    addToCart(food);
    toast.success(`${food.name} added to cart!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };

  useEffect(() => {
    getFoods();
  }, []);

  if (loading) {
    return <p className="text-center text-xl">Loading food items...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">Error: {error}</p>;
  }

  

  return (
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
      {foods.map((food) => (
        <div key={food._id} className="food-item bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            src={food.imageUrl}
            alt={food.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-2xl font-semibold text-gray-800">{food.name}</h3>
            <p className="text-gray-600">Category: {food.category}</p>
            <p className="text-lg text-green-600 font-semibold">₹{food.price}</p>
            <p className={`text-sm ${food.availability ? "text-green-500" : "text-red-500"}`}>
              {food.availability ? "Available" : "Out of Stock"}
            </p>
            <button
              onClick={() => handleAddToCart(food)} // Add to cart with toast
              className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
              disabled={!food.availability} // Disable button if not available
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FoodList;