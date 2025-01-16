import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext'; 

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useAuth(); 
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (user?.id) {
      const cartData = localStorage.getItem(`cart-${user.id}`);
      if (cartData) {
        setCart(JSON.parse(cartData));
      } else {
        setCart([]);
      }
    } else {
      setCart([]);
    }
  }, [user?.id]); 

  useEffect(() => {
    if (user?.id) {
      localStorage.setItem(`cart-${user.id}`, JSON.stringify(cart));
    }
  }, [cart, user?.id]);

  const addToCart = (food) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === food._id);
      if (existingItem) {
        return prevCart.map((item) =>
          item._id === food._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...food, quantity: 1 }];
    });
  };

  const incrementQuantity = (foodId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === foodId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (foodId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item._id === foodId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (foodId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== foodId));
  };

  const clearCart = () => {
    setCart([]);
    if (user?.id) {
      localStorage.removeItem(`cart-${user.id}`);
    }
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Calculate total price and check if it's 0
  const totalPrice = calculateTotalPrice();

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        incrementQuantity,
        decrementQuantity,
        removeFromCart,
        clearCart,
        calculateTotalPrice,
        totalPrice, // Expose totalPrice to be used in Cart component
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
