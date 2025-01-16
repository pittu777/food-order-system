import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { placeOrder } from "../api/orderApi";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import { getUserOrders } from "../api/orderApi";
const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const { cart, calculateTotalPrice, clearCart } = useCart(); 
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handlePlaceOrder = async (address) => {
    try {
      setLoading(true);
  
      const orderDetails = {
        items: cart.map(({ _id, name, price, quantity }) => ({
          foodId: _id,
          name,
          price,
          quantity,
        })),
        totalAmount: calculateTotalPrice(),
        address,
      };
  
      const order = await placeOrder(orderDetails);
  
      if (order) {
        toast.success('Order placed successfully!');
        navigate("/order-summary", {state:{order}})
        setOrders((prevOrders) => [...prevOrders, order]);
        clearCart();
      } else {
        toast.error('Failed to place the order.');
      }
    } catch (error) {
      console.error('Failed to place order:', error);
      toast.error('Error placing the order. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        const user = storedUser ? JSON.parse(storedUser) : null; 
        const userId = user?.id;
        console.log(userId);
        

        if (userId) {
          const fetchedOrders = await getUserOrders(userId);
          setOrders(fetchedOrders);
        } else {
          console.error('No userId found in localStorage');
          setOrders([]);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);
  

  return (
    <OrderContext.Provider value={{ orders, handlePlaceOrder, setOrders, orders, loading }}>
      {children}
    </OrderContext.Provider>
  );
};