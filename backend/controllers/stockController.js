const Stock = require("../models/stock");

// Get stocks by user ID
exports.getStocksByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const stocks = await Stock.find({ userId });
    res.json(stocks);
  } catch (error) {
    console.error("Error retrieving stocks:", error);
    res.status(500).json({ error: "Failed to retrieve stocks" });
  }
};
