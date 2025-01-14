import React, { createContext, useContext, useReducer, useEffect } from "react";
import {fetchAllFoods} from "../api/foodApi";


const FoodContext = createContext();

const initialState = {
  foods: [],
  loading: false,
  error: null,
};

const foodReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_FOODS_REQUEST":
      return { ...state, loading: true };
    case "FETCH_FOODS_SUCCESS":
      return { ...state, loading: false, foods: action.payload };
    case "FETCH_FOODS_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const FoodProvider = ({ children }) => {
  const [state, dispatch] = useReducer(foodReducer, initialState);

  
  const getFoods = async () => {
    dispatch({ type: "FETCH_FOODS_REQUEST" });
    try {
      const data = await fetchAllFoods(); 
      dispatch({ type: "FETCH_FOODS_SUCCESS", payload: data });
    } catch (err) {
      dispatch({ type: "FETCH_FOODS_FAILURE", payload: err.message });
    }
  };

 
  useEffect(() => {
    getFoods(); 
  }, []);
  
  return (
    <FoodContext.Provider value={{ ...state, getFoods }}>
      {children}
    </FoodContext.Provider>
  );
};

export const useFood = () => useContext(FoodContext);
