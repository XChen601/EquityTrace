import axios from "axios";

const API_URL = process.env.REACT_APP_API_BASE_URL + "userStocks/";

// Create new user stock
const createUserStock = async (stockData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, stockData, config);

  return response.data;
};

// Update a users stock if they buy/sell
const updateUserStock = async (stockData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL, stockData, config);
  console.log(response.data);
  return response.data;
};

// gets all user's stocks
const getUserStocks = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  console.log(response.data);
  return response.data;
};

// Delete a user stock
const deleteUserStock = async (userStockId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + userStockId, config);

  return response.data;
};

const userStocksService = {
  createUserStock,
  getUserStocks,
  deleteUserStock,
  updateUserStock
};

export default userStocksService;
