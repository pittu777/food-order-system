import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { FoodProvider } from './context/FoodContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { OrderProvider } from './context/OrderContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AdminProvider } from './context/AdminContext.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
  <AuthProvider>
    <CartProvider>
      <FoodProvider>
        <OrderProvider>
          <AdminProvider>


          <App />
          </AdminProvider>
          
        </OrderProvider>
      </FoodProvider>
    </CartProvider>
  </AuthProvider>
    </BrowserRouter>
    
</StrictMode>

)
