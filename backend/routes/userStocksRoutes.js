const express = require("express");
const router = express.Router();
const {
  getUserStocks,
  setUserStock,
  updateUserStock,
  deleteUserStock,
} = require("../controllers/userStocksController");

const { protect } = require("../middleware/authMiddleware");

router
  .route("/")
  .get(protect, getUserStocks)
  .post(protect, setUserStock)
  .put(protect, updateUserStock);

router
  .route("/:id")

  .delete(protect, deleteUserStock);

module.exports = router;
