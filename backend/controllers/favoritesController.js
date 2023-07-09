const asyncHandler = require("express-async-handler");

const getFavorites = asyncHandler(async (req, res) => {
  res.json({ message: "get favorites" });
});

const setFavorite = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
  }
  res.json({ message: "set favorites" });
});

const updateFavorite = asyncHandler(async (req, res) => {
  res.json({ message: `update favorite ${req.params.id}` });
});

const deleteFavorite = asyncHandler(async (req, res) => {
  res.json({ message: `delete favorite ${req.params.id}` });
});

module.exports = {
  getFavorites,
  setFavorite,
  updateFavorite,
  deleteFavorite,
};
