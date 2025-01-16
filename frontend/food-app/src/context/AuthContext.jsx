import React, { createContext, useReducer, useContext, useEffect } from 'react';

const AuthContext = createContext();

const initialState = {
  isAuthenticated: localStorage.getItem('authToken') ? true : false,
  user: null,
  token: localStorage.getItem('authToken') || null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { ...state, isAuthenticated: true, user: action.payload.user, token: action.payload.token };
    case 'LOGOUT':
      return { ...state, isAuthenticated: false, user: null, token: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const user = JSON.parse(localStorage.getItem('user'));
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } });
    }
  }, []);

  const login = (user, token) => {
    console.log(user);
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
    dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } });
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
    if (state.user?.id) {
      localStorage.removeItem(`cart-${state.user.id}`);
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;


