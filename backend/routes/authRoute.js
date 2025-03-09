const express = require("express");
const { signup, login } = require("../controllers/auth");
const User = require("../model/SignUp"); // Assuming you have a User model
const { ensureAuth, checkRole } = require("../middleware/middleware") ; 

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);


router.get("/mentors",async (req, res) => {
    try {
      const mentors = await User.find({ role: "Mentor" }).select("-password"); // Exclude password field
      res.status(200).json(mentors);
    } catch (error) {
      console.error("Error fetching mentors:", error);
      res.status(500).json({ error: "Server error" });
    }
  });
  
  // 📌 Route: Get all students (learners)
  router.get("/students", async (req, res) => {
    try {
      const students = await User.find({ role: "Learner" }).select("-password"); // Exclude password field
      res.status(200).json(students);
    } catch (error) {
      console.error("Error fetching students:", error);
      res.status(500).json({ error: "Server error" });
    }
  });
  
module.exports = router;
