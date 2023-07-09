const asyncHandler = require("express-async-handler");

const Favorite = require("../models/favorite");

const getFavorites = asyncHandler(async (req, res) => {
  const favorites = await Favorite.find({});
  res.json(favorites);
});

const setFavorite = asyncHandler(async (req, res) => {
  const favorite = await Favorite.create({
    stockTicker: req.body.stockTicker,
    savedPrice: req.body.savedPrice,
    notes: req.body.notes,
  });
  res.json(favorite);
});

const updateFavorite = asyncHandler(async (req, res) => {
  const favorite = await Favorite.findById(req.params.id);

  if (!favorite) {
    res.status(404);
    throw new Error("Favorite not found");
  }

  const updatedFavorite = await Favorite.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.json(updatedFavorite);
});

const deleteFavorite = asyncHandler(async (req, res) => {
  const favorite = await Favorite.findById(req.params.id);

  if (!favorite) {
    res.status(404);
    throw new Error("Favorite not found");
  }

  await favorite.deleteOne();

  res.json({ id: req.params.id });
});

module.exports = {
  getFavorites,
  setFavorite,
  updateFavorite,
  deleteFavorite,
};
