import React, { useEffect } from 'react';
import axios from 'axios';
import { useAdminState, useAdminDispatch } from '../context/AdminContext';
import { toast } from 'react-toastify';
const DeleteFoodItems = () => {
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


const handleDeleteFood = async (id) => {
    try {
      // Ensure the URL format is correct
      await axios.delete(`http://localhost:5000/api/foods/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
  
      // Dispatch local state update (optimistic UI update)
      dispatch({ type: 'DELETE_FOOD_ITEM', payload: id });
  
      // Show success toast
      toast.success('Food item deleted successfully!');
    } catch (error) {
      console.error('Error deleting food item:', error);
      toast.error('Failed to delete food item.');
    }
  };
  
  
  return (
    <div className="p-6 bg-white shadow rounded-md">
      <h3 className="text-2xl font-semibold mb-4">Delete Food Items</h3>
      {foodItems.length > 0 ? (
        <ul className="space-y-4">
          {foodItems.map((food) => (
            <li
              key={food._id}
              className="flex items-center justify-between border-b py-2"
            >
              <div>
                <p className="font-medium">{food.name}</p>
                <p className="text-sm text-gray-600">${food.price}</p>
              </div>
              <button
                onClick={() => handleDeleteFood(food._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No food items available to delete.</p>
      )}
    </div>
  );
};

export default DeleteFoodItems;
