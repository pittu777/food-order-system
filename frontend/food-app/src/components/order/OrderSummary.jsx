import React from 'react';
import { useOrder } from '../../context/OrderContext';

const OrderSummary = () => {
  const { orders, loading } = useOrder();
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600">Loading your orders...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600">No orders available. Place your first order!</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Your Order Summary
      </h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Order ID: <span className="text-indigo-600">{order._id}</span>
            </h3>
            <p className="text-gray-600 mb-1">
              <span className="font-medium text-gray-800">Status:</span> {order.status}
            </p>
            <p className="text-gray-600 mb-1">
              <span className="font-medium text-gray-800">Total Amount:</span> ${order.totalAmount}
            </p>
            <p className="text-gray-600">
              <span className="font-medium text-gray-800">Created At:</span>{' '}
              {new Date(order.createdAt).toLocaleString()}
            </p>

            <div className="mt-4">
              <h4 className="text-md font-semibold text-gray-800 mb-2">
                Items Ordered:
              </h4>
              <ul className="list-disc list-inside space-y-1">
                {order.items.map((item, index) => (
                  <li key={index} className="text-gray-600">
                    <span className="font-medium text-gray-800">{item.foodId.name}</span>{' '}
                    (x{item.quantity})
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderSummary;
