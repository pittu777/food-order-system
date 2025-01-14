import axios from "axios";

const API_URL = "http://localhost:5000/api/foods"; 

export const fetchAllFoods = async () => {
  try {
    const response = await axios.get(`${API_URL}/all-food`);
    return response.data.foods;
  } catch (error) {
    console.error("Error fetching food items:", error);
    throw error;
  }
};
