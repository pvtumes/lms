const express = require("express");
const User = require("../model/SignUp");
const { ensureAuth, checkAdmin } = require("../middleware/middleware");

const router = express.Router();

// 📌 Route: Assign Mentor to Student (Admin Only)
router.post("/assign-mentor", checkAdmin, async (req, res) => {
  try {
    const { studentId, mentorId } = req.body;

    // Check if the student exists
    const student = await User.findOne({ _id: studentId, role: "Learner" });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Check if the mentor exists
    const mentor = await User.findOne({ _id: mentorId, role: "Mentor" });
    if (!mentor) {
      return res.status(404).json({ error: "Mentor not found" });
    }

    // Assign the mentor to the student
    student.assignedMentor = mentorId;
    await student.save();

    res.status(200).json({ message: "Mentor assigned successfully", student });
  } catch (error) {
    console.error("Error assigning mentor:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
