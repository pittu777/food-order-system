import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, Route } from 'react-router-dom';

const ProtectedRoute = ({ element, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      element={isAuthenticated ? element : <Navigate to="/login" />}
    />
  );
};

export default ProtectedRoute;