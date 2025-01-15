import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/Home/Navbar'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from './pages/LoginPage'
import Home from './components/Home/Home'
import ProtectedRoute from './components/ProtectedRoute'
import { useAuth } from './context/AuthContext'
import Cart from './components/cart/FoodCart'
import CheckoutPage from './components/checkout/CheckoutPage'
import OrderSummary from './components/order/OrderSummary'
function App() {

  const {isAuthenticated} = useAuth();

  return (
    <>
      {/* <Router> */}
        <NavBar/>
    <ToastContainer/>
        <Routes>
          <Route path='/' element={isAuthenticated?<Home/>:<Navigate to="/login"/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/cart' element={isAuthenticated?<Cart/>:<Navigate to="/login"/>}/>
          <Route path='/checkout' element={isAuthenticated ? <CheckoutPage /> : <Navigate to="/login" />} />
          <Route path='/order-summary' element={isAuthenticated ? <OrderSummary /> : <Navigate to="/login" />} />
        </Routes>
      {/* </Router> */}
    </>
  )
}

export default App
