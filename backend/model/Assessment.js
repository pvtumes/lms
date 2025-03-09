const mongoose = require("mongoose");

const AssessmentSchema = new mongoose.Schema({
  mentorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  description: { type: String, required: true },
  totalMarks: { type: Number, required: true },
  fileUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
 
module.exports = mongoose.model("Assessment", AssessmentSchema) ; 
 


const AssignmentSubmissionSchema = new mongoose.Schema({
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assignment",
    required: true,
  },
  learnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  mentorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fileUrl: {
    type: String, // URL of uploaded assignment file
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Evaluated"],
    default: "Pending",
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("AssignmentSubmission", AssignmentSubmissionSchema);


