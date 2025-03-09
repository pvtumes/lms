const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["Learner", "Mentor", "Admin"], required: true },
  assignedMentor: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }, // Store mentor for students
});

module.exports = mongoose.model("Admin", UserSchema);
