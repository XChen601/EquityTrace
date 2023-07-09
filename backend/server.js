const express = require("express");

const app = express();

// Connect to the database
app.get("/", (req, res) => {
  res.send("API running");
});

// ... Rest of your app code

// Start the server
app.listen(5000, () => {
  console.log("Server started on port 5000");
});
