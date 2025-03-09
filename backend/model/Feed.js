const mongoose = require("mongoose");

// Define the feedback schema
const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNo: { type: String, required: true },
  answers: { type: Object, required: true },
});

// Create the Feedback model
const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;