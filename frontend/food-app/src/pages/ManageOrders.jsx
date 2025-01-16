import React, { useEffect, useState } from 'react';
import apiClient from '../utils/apiClient';
import { toast } from 'react-toastify';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  // Fetch all orders
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

 

  // Change order status
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
      setOrders(orders.filter((order) => order._id !== orderId)); // Remove deleted order from state
    } catch (error) {
      console.error('Error deleting order:', error);
      toast.error('Failed to delete order.');
    }
  };


  // Pagination logic
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
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Manage Orders</h3>
        <div className="space-y-4">
          {currentOrders.map((order) => (
            <div key={order._id} className="border-b py-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">Order ID: {order._id}</p>
                  <p>Status: {order.status}</p>
                  <p>Total: ${order.totalAmount.toFixed(2)}</p>
                  <p>
  Items:{' '}
  {order.items.map((item) => (
    <span key={item._id}>
      {item.quantity}x {item.foodName || item.foodId?._id || 'Food ID not found'}
    </span>
  ))}
</p>
                </div>
                <div>
                  {/* Dropdown to change status */}
                  <select
                    value={order.status}
                    onChange={(e) => changeOrderStatus(order._id, e.target.value)}
                    className="border-gray-300 p-2 rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                  {/* Delete Button */}
                  <button
                    onClick={() => deleteOrder(order._id)}
                    className="ml-4 text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Pagination */}
        <div className="mt-4">
          {Array.from({ length: Math.ceil(orders.length / ordersPerPage) }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 mx-1 rounded ${
                currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageOrders;
