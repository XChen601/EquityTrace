const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const cors = require("cors");
const port = process.env.PORT || 5000;

connectDB();

const app = express();

// CORS configuration
app.use(
  cors({
    origin: "https://main--jade-duckanoo-a628d6.netlify.app",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/userStocks", require("./routes/userStocksRoutes"));

app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
