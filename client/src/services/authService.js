// src/services/authService.js

import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL + "users/";

const authService = {
  async register(userData) {
    const response = await axios.post(API_URL + "register", userData);
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  },

  async login(userData) {
    const response = await axios.post(API_URL + "login", userData);
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  },

  logout() {
    localStorage.removeItem("user");
  },
};

export default authService;
