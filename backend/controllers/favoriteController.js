const asyncHandler = require("express-async-handler");

const Favorite = require("../models/favorite");
const User = require("../models/user");
const favorite = require("../models/favorite");

const getFavorites = asyncHandler(async (req, res) => {
  const favorites = await Favorite.find({ user: req.user.id });
  res.json(favorites);
});

const setFavorite = asyncHandler(async (req, res) => {
  const favorite = await Favorite.create({
    stockTicker: req.body.stockTicker,
    savedPrice: req.body.savedPrice,
    notes: req.body.notes,
    user: req.user.id,
  });
  res.json(favorite);
});

const updateFavorite = asyncHandler(async (req, res) => {
  console.log("req" + req.body.stockTicker);
  console.log("test");
  const updatedFavorite = await Favorite.findOneAndUpdate(
    { stockTicker: req.body.stockTicker, user: req.user.id },
    {
      $set: {
        stockTicker: req.body.stockTicker,
        savedPrice: req.body.savedPrice,
        notes: req.body.notes,
        user: req.user.id,
      },
      $currentDate: {
        createdAt: { $setOnInsert: new Date() },
        updatedAt: true,
      },
    },
    {
      new: true, // This option returns the updated document
      upsert: true, // This option creates the document if it doesn't exist
    }
  );

  console.log(updatedFavorite._id);
  const favorite = await Favorite.findOne({ _id: updatedFavorite._id });
  res.json(updatedFavorite);
});

const deleteFavorite = asyncHandler(async (req, res) => {
  const favorite = await Favorite.findById(req.params.id);

  if (!favorite) {
    res.status(404);
    throw new Error("Favorite not found");
  }

  // check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (favorite.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
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
