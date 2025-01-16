import React, { useEffect, useState } from 'react';
import apiClient from '../utils/apiClient';
import { toast } from 'react-toastify';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await apiClient.get('/orders/all-orders');
        console.log('API Response:', response.data);
console.log('Orders:', response.data.orders);

        setOrders(response.data.orders);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast.error('Failed to fetch orders.');
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

 

  const changeOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await apiClient.put(`admin/orders/${orderId}/status`, { status: newStatus });
      toast.success('Order status updated successfully!');
      setOrders(orders.map((order) => (order._id === orderId ? response.data : order)));
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status.');
    }
  };


  const deleteOrder = async (orderId) => {
    try {
      await apiClient.delete(`/orders/${orderId}`);
      toast.success('Order deleted successfully!');
      setOrders(orders.filter((order) => order._id !== orderId));
    } catch (error) {
      console.error('Error deleting order:', error);
      toast.error('Failed to delete order.');
    }
  };


  const currentOrders = orders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (loading) return <div>Loading orders...</div>;
  if (!loading && orders.length === 0) return <div>No orders found!</div>;

  return (
    <>
  <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h3 className="text-3xl font-semibold text-gray-800 mb-8">Manage Orders</h3>
        <div className="space-y-6">
          {currentOrders.map((order) => (
            <div key={order._id} className="border-b pb-6">
              <div className="flex justify-between items-center">
                <div className="w-2/3">
                  <p className="text-lg font-semibold text-gray-700">Order ID: {order._id}</p>
                  <p className="text-sm text-gray-600">Status: <span className="font-medium text-blue-600">{order.status}</span></p>
                  <p className="text-sm text-gray-600">Total: <span className="font-semibold">${order.totalAmount.toFixed(2)}</span></p>
                  <p className="text-sm text-gray-600">Address: <span className="font-semibold">{order.address}</span></p>

                  <p className="text-sm text-gray-600">Items:</p>
                  <div className="space-y-1">
                    {order.items.map((item) => (
                      <span key={item._id} className="block text-sm text-gray-600">
                        {item.quantity}x {item.foodName || item.foodId?._id || 'Food ID not found'}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="w-1/3 text-right">
                  
                  <select
                    value={order.status}
                    onChange={(e) => changeOrderStatus(order._id, e.target.value)}
                    className="w-full p-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                  
                  <button
                    onClick={() => deleteOrder(order._id)}
                    className="text-sm text-red-600 hover:text-red-700 focus:outline-none"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 flex justify-center space-x-2">
          {Array.from({ length: Math.ceil(orders.length / ordersPerPage) }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-4 py-2 rounded-lg text-lg font-medium ${
                currentPage === i + 1
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
              </>
  );
};

export default ManageOrders;
