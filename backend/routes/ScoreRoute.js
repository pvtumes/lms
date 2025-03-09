const express = require("express");
const scoreController = require("../controllers/ScoreController");
const authMiddleware = require("../middleware/middleware"); // Middleware to check if the user is logged in

const router = express.Router();

// Save score route
router.post("/save-score", scoreController.saveScore);

module.exports = router;
