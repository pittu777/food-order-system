import React, { createContext, useReducer, useContext, useState } from 'react';


const AdminStateContext = createContext();
const AdminDispatchContext = createContext();

const adminReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ADMIN_USER':
      return { ...state, adminUser: action.payload };
    case 'SET_FOOD_ITEMS':
      return { ...state, foodItems: action.payload };
    case 'SET_USERS':
      return { ...state, users: action.payload };
    case 'DELETE_USER':
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload),
      };
    case 'DELETE_FOOD_ITEM':
      return {
        ...state,
        foodItems: state.foodItems.filter((food) => food._id !== action.payload),
      };
    default:
      return state;
  }
};

export const useAdminState = () => useContext(AdminStateContext);
export const useAdminDispatch = () => useContext(AdminDispatchContext);

export const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, {
    adminUser: null,
    foodItems: [],
    users: [],
  });

  return (
    <AdminStateContext.Provider value={state}>
      <AdminDispatchContext.Provider value={dispatch}>
        {children}
      </AdminDispatchContext.Provider>
    </AdminStateContext.Provider>
  );
};
