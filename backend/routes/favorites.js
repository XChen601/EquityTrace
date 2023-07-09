const express = require("express");
const router = express.Router();
const {
  getFavorites,
  setFavorite,
  updateFavorite,
  deleteFavorite,
} = require("../controllers/favoriteController");

router.route("/").get(getFavorites).post(setFavorite);

router.route("/:id").put(updateFavorite).delete(deleteFavorite);

module.exports = router;
