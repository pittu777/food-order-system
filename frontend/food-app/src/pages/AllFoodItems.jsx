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
    <div className="min-h-screen bg-gray-100 p-6">
    <h3 className="text-2xl font-semibold text-center text-gray-800 mb-6">
      All Food Items
    </h3>
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {foodItems.map((food) => (
          <div
            key={food._id}
            className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200"
          >
            <img
              src={food.imageUrl}
              alt={food.name}
              className="w-full h-48 object-cover"
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
