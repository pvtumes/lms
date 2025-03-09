const express = require("express");
const Assessment = require("../model/Assessment");
const { verifyMentor } = require("../middleware/middleware");
const upload = require("../middleware/upload");
const { ensureAuth, checkRole } = require("../middleware/middleware");
const Assignment = require("../model/Assessment");
const AssignmentSubmission = require("../model/Assessment");

const router = express.Router();

// ✅ Create Assessment (Mentor Only) + File Upload
router.post("/create", verifyMentor, upload.single("assessmentFile"), async (req, res) => {
  try {
    const { description, totalMarks } = req.body;

    if (!req.file) {
        
      return res.status(400).json({ error: "Assessment file is required" });
    }

    const fileUrl = req.file.path; // Cloudinary URL or local path

    const assessment = new Assessment({
      mentorId: req.user.id,
      description,
      totalMarks,
      fileUrl
    });

    await assessment.save();
    res.status(201).json({ message: "Assessment uploaded!", assessment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}); 


router.post("/submit/:assignmentId", ensureAuth, checkRole("Learner"), upload.single("file"), async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const learnerId = req.user.id; // Learner submitting the assignment
    const fileUrl = req.file.path; // File path

    // Find the assignment and mentor
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    const mentorId = assignment.mentorId;

    // Check if the learner already submitted this assignment
    const existingSubmission = await AssignmentSubmission.findOne({ assignmentId, learnerId });
    if (existingSubmission) {
      return res.status(400).json({ error: "You have already attempted this assignment." });
    }

    // Create a new submission
    const newSubmission = new AssignmentSubmission({
      assignmentId,
      learnerId,
      mentorId,
      fileUrl,
      status: "Pending",
    });

    await newSubmission.save();

    res.status(201).json({ message: "Assignment submitted successfully!", submission: newSubmission });
  } catch (error) {
    console.error("Error submitting assignment:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Get All Assessments
router.get("/", async (req, res) => {
    try {
      const token = req.header("Authorization");
      if (!token) return res.status(401).json({ error: "Access Denied" });
  
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verified;
  
      if (req.user.role === "Learner") {
        // 🔹 Learners can view all assessments
        const assessments = await Assessment.find().populate("mentorId", "email role");
        return res.status(200).json(assessments);
      } else if (req.user.role === "Mentor") {
        // 🔹 Mentors can only view assessments they created
        const assessments = await Assessment.find({ mentorId: req.user.id }).populate("mentorId", "email role");
        return res.status(200).json(assessments);
      } else {
        return res.status(403).json({ error: "Only Learners and Mentors can view assessments" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  });  


  
  

module.exports = router;
