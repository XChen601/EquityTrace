const asyncHandler = require("express-async-handler");

const UserStocks = require("../models/userStocks");

const getUserStocks = asyncHandler(async (req, res) => {
  const userStocks = await UserStocks.find({ user: req.user.id });
  res.json(userStocks);
});

const setUserStock = asyncHandler(async (req, res) => {
  const userStock = await UserStocks.create({
    stockTicker: req.body.stockTicker,
    savedPrice: req.body.savedPrice,
    notes: req.body.notes,
    user: req.user.id,
  });
  res.json(userStock);
});

const getNewAveragePrice = (
  oldData,
  incrementShares,
  price,
  transactionType
) => {
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

// updates profit, average price, 
const updateUserStock = asyncHandler(async (req, res) => {
  const oldData = await UserStocks.findOne({
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
  const newAveragePrice = getNewAveragePrice(
    oldData,
    incrementShares,
    req.body.price,
    req.body.transactionType
  );

  const updatedUserStock = await UserStocks.findOneAndUpdate(
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

  res.json(updatedUserStock);
});

const deleteUserStock = asyncHandler(async (req, res) => {
  const userStock = await UserStocks.findById(req.params.id);

  if (!userStock) {
    res.status(404);
    throw new Error("Stock not found");
  }

  // check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (userStock.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await userStock.remove();

  res.json({ id: req.params.id });
});

module.exports = {
  getUserStocks,
  setUserStock,
  updateUserStock,
  deleteUserStock,
};
