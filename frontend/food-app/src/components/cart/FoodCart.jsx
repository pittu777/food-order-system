import React from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const {
    cart,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    clearCart,
    calculateTotalPrice,
  } = useCart();
  const navigate = useNavigate();

  const handleCheckout=()=>{
    navigate("/checkout")
  }
console.log(cart);
  const totalPrice = calculateTotalPrice();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.length > 0 ? (
        <div>
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center mb-4 bg-white p-4 rounded-lg shadow-md"
            >
              <div>
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-gray-600">Price: ₹{item.price}</p>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
                <div className="flex items-center mt-2 space-x-2">
                  <button
                    onClick={() => decrementQuantity(item._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => incrementQuantity(item._id)}
                    className="bg-green-500 text-white px-2 py-1 rounded-lg hover:bg-green-600"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="mt-4">
            <h3 className="text-xl font-semibold">
              Total Price: ₹{totalPrice.toFixed(2)}
            </h3>
            <button
              onClick={clearCart}
              className="mt-2 w-full bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-900"
            >
              Clear Cart
            </button>
            <button
        onClick={handleCheckout}
        className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
      >
        Proceed to Checkout
      </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-600">Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;