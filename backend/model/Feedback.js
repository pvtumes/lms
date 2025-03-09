// models/Feedback.js
const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    feedName: { type: String, required: true },
    studentInfo: {
      name: { type: String, required: true },
      rollNo: { type: String, required: true },
      email: { type: String, required: true },
    },
    feedback: { type: String, required: true },
  },
  { timestamps: true }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
