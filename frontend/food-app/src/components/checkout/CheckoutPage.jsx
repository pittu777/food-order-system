import React, { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { useOrder } from "../../context/OrderContext";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { cart, calculateTotalPrice, clearCart } = useCart(); 
  const { handlePlaceOrder, loading } = useOrder();
  const [address, setAddress] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    if (cart.length === 0) {
      navigate("/", { replace: true });
    }
  }, [cart, navigate]);


  const handleSubmitOrder = () => {
    if (!address.trim()) {
      alert("Please enter a valid delivery address.");
      return;
    }
    handlePlaceOrder(address);
    clearCart();
    navigate("order-summary", {replace:true});
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <div>
        <h3 className="text-xl font-semibold">Items in Cart:</h3>
        {cart.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center bg-gray-100 p-2 rounded mb-2"
          >
            <span>{item.name}</span>
            <span>
              {item.quantity} x ₹{item.price} = ₹{item.quantity * item.price}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-semibold">
          Total Price: ₹{calculateTotalPrice()}
        </h3>
      </div>
      <div className="mt-4">
        <label className="block mb-2">Delivery Address:</label>
        <textarea
          className="w-full border p-2 rounded"
          rows="3"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your address"
        ></textarea>
      </div>
      <button
        onClick={handleSubmitOrder}
        className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
        disabled={loading}
      >
        {loading ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
};

export default CheckoutPage;