import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/Home/Navbar'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom"
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from './pages/LoginPage'
import ProtectedRoute from './components/ProtectedRoute'
import { useAuth } from './context/AuthContext'
import Cart from './components/cart/FoodCart'
import CheckoutPage from './components/checkout/CheckoutPage'
import OrderSummary from './components/order/OrderSummary'
import Home from './pages/Home'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import AllFoodItems from './pages/AllFoodItems'
import ManageProducts from './pages/ManageProducts'
import AllUsers from './pages/AllUsers'
import DeleteFoodItems from './pages/DeleteFoodItems'
import ManageOrders from './pages/ManageOrders'
// import AdminRoute from './utils/AdminRoute'
function App() {

  const {isAuthenticated} = useAuth();



  return (
    <>
     
        <NavBar/>
    <ToastContainer/>
        <Routes>
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
<Route path="/users" element={<AllUsers />} />
          <Route path="/foods" element={<AllFoodItems />} />
          <Route path="/manage-products" element={<ManageProducts />} />
          <Route path="/delete-food-items" element={<DeleteFoodItems />} />
          <Route path="/manage-orders" element={<ManageOrders />} />
          <Route path='/' element={isAuthenticated?<Home/>:<Navigate to="/login"/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/cart' element={isAuthenticated?<Cart/>:<Navigate to="/login"/>}/>
          <Route path='/checkout' element={isAuthenticated ? <CheckoutPage /> : <Navigate to="/login" />} />
          <Route path='/order-summary' element={isAuthenticated ? <OrderSummary /> : <Navigate to="/login" />} />
        </Routes>
      
    </>
  )
}

export default App
