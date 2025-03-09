// controllers/FeedbackController.js
const Feedback = require("../model/Feedback");

// Handle feedback submission
exports.submitFeedback = async (req, res) => {
  try {
    const { feedName, studentInfo, feedback } = req.body;

    const newFeedback = new Feedback({
      feedName,
      studentInfo,
      feedback,
    });

    // Save feedback to the database
    const savedFeedback = await newFeedback.save();
    res
      .status(201)
      .json({
        message: "Feedback submitted successfully",
        data: savedFeedback,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to submit feedback", error: error.message });
  }
};

// Get all feedback submissions
exports.getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch feedbacks", error: error.message });
  }
};
