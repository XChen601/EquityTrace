const express = require("express");
const router = express.Router();
const {
  getFavorites,
  setFavorite,
  updateFavorite,
  deleteFavorite,
} = require("../controllers/favoriteController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getFavorites).post(protect, setFavorite);

router
  .route("/:id")
  .put(protect, updateFavorite)
  .delete(protect, deleteFavorite);

module.exports = router;
