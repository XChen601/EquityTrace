const mongoose = require("mongoose");

// Define the schema
const stockSchema = new mongoose.Schema({
  stockTicker: {
    type: String,
    required: true,
    uppercase: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  savedPrice: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  notes: {
    type: String,
    default: "",
  },
});

// Create the model based on the schema
const Stock = mongoose.model("Stock", stockSchema);

// Export the model
module.exports = Stock;
