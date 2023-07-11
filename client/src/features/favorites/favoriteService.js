import axios from "axios";

const API_URL = "/api/favorites/";

// Create new favorite
const createFavorite = async (favoriteData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, favoriteData, config);

  return response.data;
};

const favoriteService = {
  createFavorite,
};

export default favoriteService;
