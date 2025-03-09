// routes/feedbackRoutes.js
const express = require("express");
const router = express.Router();
const FeedbackController = require("../controllers/Feedback");

// Route to submit feedback
router.post("/submit", FeedbackController.submitFeedback);

// Route to get all feedbacks
router.get("/all", FeedbackController.getFeedbacks);

module.exports = router;
