const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
  email: { type: String },
  assessmentType: { type: String, required: true },
  score: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Score", scoreSchema);
