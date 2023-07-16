const mongoose = require("mongoose");

// Define the schema
const favoriteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    stockTicker: {
      type: String,
      required: true,
      uppercase: true,
    },
    notes: {
      type: String,
      default: "",
    },
    shares: {
      type: Number,
      default: 0,
    },
    profit: {
      type: Number,
      default: 0,
    },
    averagePrice: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Favorite", favoriteSchema);
