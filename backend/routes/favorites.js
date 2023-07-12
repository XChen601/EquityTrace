const express = require("express");
const router = express.Router();
const {
  getFavorites,
  setFavorite,
  updateFavorite,
  deleteFavorite,
} = require("../controllers/favoriteController");

const { protect } = require("../middleware/authMiddleware");

router
  .route("/")
  .get(protect, getFavorites)
  .post(protect, setFavorite)
  .put(protect, updateFavorite);

router
  .route("/:id")

  .delete(protect, deleteFavorite);

module.exports = router;
