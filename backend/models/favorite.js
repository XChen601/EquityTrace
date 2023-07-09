const mongoose = require("mongoose");

// Define the schema
const favoriteSchema = new mongoose.Schema(
  {
    stockTicker: {
      type: String,
      required: true,
      uppercase: true,
    },
    // userId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
    savedPrice: {
      type: Number,
      required: true,
    },
    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Favorite", favoriteSchema);
