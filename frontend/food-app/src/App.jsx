import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/Home/Navbar'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"

import LoginPage from './pages/LoginPage'
import Home from './components/Home/Home'
import ProtectedRoute from './components/ProtectedRoute'
import { useAuth } from './context/AuthContext'
function App() {

  const {isAuthenticated} = useAuth();

  return (
    <>
      <Router>
        <NavBar/>
        <Routes>
          <Route path='/' element={isAuthenticated?<Home/>:<Navigate to="/login"/>}/>
          <Route path='/login' element={<LoginPage/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
