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

const getNewAveragePrice = async (
  oldData,
  incrementShares,
  price,
  transactionType
) => {
  console.log("shares" + incrementShares);
  console.log("price" + price);
  console.log("transactionType" + transactionType);
  let newAveragePrice = price;
  if (oldData && transactionType === "BUY") {
    const newShares = oldData.shares + incrementShares;
    newAveragePrice =
      (oldData.averagePrice * oldData.shares + price * incrementShares) /
      newShares;
  } else if (oldData && transactionType === "SELL") {
    newAveragePrice = oldData.averagePrice;
  } else if (oldData && !transactionType) {
    newAveragePrice = oldData.averagePrice;
  }
  return newAveragePrice;
};

const getIncrementShares = (transactionType, shares) => {
  if (transactionType === "BUY") {
    return shares;
  } else if (transactionType === "SELL") {
    return -shares;
  }
  return 0;
};

const updateFavorite = asyncHandler(async (req, res) => {
  const oldData = await Favorite.findOne({
    stockTicker: req.body.stockTicker,
    user: req.user.id,
  });

  const incrementShares = getIncrementShares(
    req.body.transactionType,
    req.body.shares
  );

  // calculate profit
  let incrementProfit;
  if (req.body.transactionType === "SELL") {
    incrementProfit = req.body.shares * (req.body.price - oldData.averagePrice); // Add profit if it's a "sell" transaction
  } else {
    incrementProfit = 0;
  }

  // calculate new average price

  const newAveragePrice = await getNewAveragePrice(
    oldData,
    incrementShares,
    req.body.price,
    req.body.transactionType
  );
  console.log("average price: " + newAveragePrice);

  const updatedFavorite = await Favorite.findOneAndUpdate(
    { stockTicker: req.body.stockTicker, user: req.user.id },
    {
      $set: {
        user: req.user.id,
        stockTicker: req.body.stockTicker,
        savedPrice: req.body.savedPrice,
        notes: req.body.notes,
        averagePrice: newAveragePrice,
      },
      $inc: {
        shares: incrementShares,
        profit: incrementProfit,
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
