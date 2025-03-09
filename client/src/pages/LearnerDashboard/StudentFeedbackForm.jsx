import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/StudentFeedbackForm.css"; // Import the CSS file

const StudentFeedbackForm = () => {
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [answers, setAnswers] = useState({});
  const [feedbackQuestions, setFeedbackQuestions] = useState([]);
  const navigate = useNavigate();

  // Load questions from local storage when the component mounts
  useEffect(() => {
    const savedQuestions = JSON.parse(localStorage.getItem("feedbackQuestions")) || [];
    setFeedbackQuestions(savedQuestions);
  }, []);

  // Handle input change for answers
  const handleAnswerChange = (index, value) => {
    setAnswers({ ...answers, [index]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate name and roll number
    if (name.trim() === "" || rollNo.trim() === "") {
      alert("Please enter your name and roll number.");
      return;
    }
  
    // Validate answers
    if (Object.keys(answers).length !== feedbackQuestions.length) {
      alert("Please answer all questions.");
      return;
    }
  
    // Prepare the response object
    const response = {
      name,
      rollNo,
      answers,
    };
  
    try {
      // Send the response to the backend
      const result = await fetch("http://localhost:5000/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(response),
      });
  
      const data = await result.json(); // Parse the response
      console.log("Response from server:", data);
  
      if (!result.ok) {
        throw new Error(data.message || "Failed to submit feedback.");
      }
  
      // Save response to local storage (optional)
      const savedResponses = JSON.parse(localStorage.getItem("studentResponses")) || [];
      localStorage.setItem("studentResponses", JSON.stringify([...savedResponses, response]));
  
      // Redirect to a thank you page or clear the form
      alert("Thank you for your feedback!");
      setName("");
      setRollNo("");
      setAnswers({});
      navigate("/responses"); // Redirect to the responses page
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("An error occurred while submitting your feedback. Please try again.");
    }
  };

  return (
    <div className="student-container">
      <h2>Student Feedback Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Message:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>email Id</label>
          <input
            type="text"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
            required
          />
        </div>
        {feedbackQuestions.map((question, index) => (
          <div key={index} className="form-group">
            <label>{question.text}</label>
            {question.isMcq ? (
              <select
                value={answers[index] || ""}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                required
              >
                <option value="">Select an option</option>
                {question.options.map((option, i) => (
                  <option key={i} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                value={answers[index] || ""}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                required
              />
            )}
          </div>
        ))}
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
};

export default StudentFeedbackForm;