const express = require("express");
const router = express.Router();
const stockController = require("../controllers/stockController");
const userController = require("../controllers/userController");

// Stocks routes
router.get("/stocks", stockController.getAllStocks);
router.get("/stocks/:userId", stockController.getStocksByUserId);

// Users routes
router.get("/users", userController.getAllUsers);
router.get("/users/:userId", userController.getUserById);

module.exports = router;
