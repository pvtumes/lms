const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: String, default: "Free" },
  teacher: { type: String, required: true },
  domain: { type: String, required: true },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
