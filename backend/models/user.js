const mongoose = require("mongoose");

// Define the schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  savedStocks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stock",
    },
  ],
});

// Create the model based on the schema
const User = mongoose.model("User", userSchema);

// Export the model
module.exports = User;
