import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAdminDispatch } from '../context/AdminContext';
const ManageProducts = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('Appetizers');
    const [imageUrl, setImageUrl] = useState('');
    const [availability, setAvailability] = useState(true);
  
    const dispatch = useAdminDispatch();
  
    const handleAddProduct = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post(
          'http://localhost:5000/api/foods/add-food',
          { name, price, category, imageUrl, availability },
          {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          }
        );
        dispatch({ type: 'ADD_FOOD_ITEM', payload: response.data });
        toast.success("food item added successfully!");
        setName('');
        setPrice('');
        setCategory('Appetizers');
        setImageUrl('');
        setAvailability(true);
      } catch (error) {
        console.error('Error adding product:', error);
      }
    };
  
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            Manage Products
          </h3>
          <form onSubmit={handleAddProduct} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Food Name</label>
              <input
                type="text"
                placeholder="Food Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                min="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="Appetizers">Appetizers</option>
                <option value="Main Course">Main Course</option>
                <option value="Desserts">Desserts</option>
                <option value="Beverages">Beverages</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Image URL</label>
              <input
                type="url"
                placeholder="Image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={availability}
                onChange={(e) => setAvailability(e.target.checked)}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label className="ml-2 text-sm text-gray-700">Available</label>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  export default ManageProducts;