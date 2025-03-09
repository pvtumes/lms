import React, { useState } from "react";
import axios from "axios"; // Import axios for HTTP requests
import "../../styles/Feed.css"; // Import the CSS file

const Feed = () => {
  const [feedName, setFeedName] = useState(""); // Feed Name for the feedback form
  const [studentResponse, setStudentResponse] = useState(null); // Store one student response

  // Handle student feedback submission
  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Create the response object
    const response = {
      feedName, // Include the Feed Name in the response
      studentInfo: {
        name: formData.get("name"),
        rollNo: formData.get("rollNo"),
        email: formData.get("email"),
      },
      feedback: formData.get("feedback"), // Textarea feedback
    };

    // Send the response to the backend
    try {
      const res = await axios.post(
        "http://localhost:5000/api/feedback/submit", // API endpoint to submit feedback
        response
      );

      if (res.status === 201) {
        // If successful, update the state with the submitted response
        setStudentResponse(response);
        e.target.reset(); // Reset the form after submission
        alert("Feedback submitted successfully!");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Failed to submit feedback. Please try again.");
    }
  };

  return (
    <div className="mentor-container">
      <h2 style={{ color: "white" }}>Mentor: Create Feedback Form</h2>

      {/* Feed Name Input (Displayed once) */}
      <div className="feed-name-input">
        <input
          type="text"
          value={feedName}
          onChange={(e) => setFeedName(e.target.value)}
          placeholder="Enter Feed Name (e.g., Course Feedback)"
        />
      </div>

      {/* Student Feedback Form */}
      <div className="student-feedback-form">
        <h3 style={{ color: "white" }}>Student Feedback Submission:</h3>
        <form onSubmit={handleFeedbackSubmit}>
          {/* Name, Roll No, and Email Fields */}
          <div className="student-info">
            <label>
              Name:
              <input type="text" name="name" required />
            </label>
            <label>
              Roll No:
              <input type="text" name="rollNo" required />
            </label>
            <label>
              Email:
              <input type="email" name="email" required />
            </label>
          </div>

          {/* Text Area for Feedback */}
          <div className="feedback-textarea">
            <label>
              Feedback:
              <textarea name="feedback" required />
            </label>
          </div>

          {/* Submit Button */}
          <button type="submit">Submit Feedback</button>
        </form>
      </div>

      {/* Display the student feedback response (Only one response) */}
      {studentResponse && (
        <div className="feedback-responses">
          <h3 style={{ color: "white" }}>Student Feedback Response:</h3>
          <div className="response-item">
            <h4 style={{ color: "white" }}>
              Response (Feed: {studentResponse.feedName}):
            </h4>
            <ul>
              <li>
                <strong>Name:</strong> {studentResponse.studentInfo.name}
              </li>
              <li>
                <strong>Roll No:</strong> {studentResponse.studentInfo.rollNo}
              </li>
              <li>
                <strong>Email:</strong> {studentResponse.studentInfo.email}
              </li>
              <li>
                <strong>Feedback:</strong> {studentResponse.feedback}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feed;
