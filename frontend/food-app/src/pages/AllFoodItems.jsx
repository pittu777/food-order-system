import React, { useEffect } from 'react';
import axios from 'axios';
import { useAdminState, useAdminDispatch } from '../context/AdminContext';

const AllFoodItems = () => {
  const { foodItems } = useAdminState();
  const dispatch = useAdminDispatch();

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/foods', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        dispatch({ type: 'SET_FOOD_ITEMS', payload: response.data });
      } catch (error) {
        console.error('Error fetching food items:', error);
      }
    };

    fetchFoodItems();
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
    <h3 className="text-3xl font-semibold text-center text-gray-800 mb-8">
      All Food Items
    </h3>
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {foodItems.map((food) => (
          <div
            key={food._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={food.imageUrl}
              alt={food.name}
              className="w-full h-56 sm:h-64 object-cover"
            />
            <div className="p-4">
              <h4 className="text-lg font-semibold text-gray-700">{food.name}</h4>
              <p className="text-gray-500 text-sm">${food.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};

export default AllFoodItems;
