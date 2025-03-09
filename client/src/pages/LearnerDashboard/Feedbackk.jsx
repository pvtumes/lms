import React, { useState, useEffect } from "react";
import "./FeedBackk.css";

const Feedbackk = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [studentResponse, setStudentResponse] = useState({});

  useEffect(() => {
    // Fetch feedback data from the API
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/feedback/all");
        if (!response.ok) {
          throw new Error("Failed to fetch feedback");
        }
        const data = await response.json();
        setFeedbacks(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  // Handle the change in response input
  const handleInputChange = (event, feedbackId) => {
    const { value } = event.target;
    setStudentResponse((prevResponses) => ({
      ...prevResponses,
      [feedbackId]: value,
    }));
  };

  // Handle the submit response
  const handleSubmit = async (feedbackId) => {
    const responseText = studentResponse[feedbackId];

    if (!responseText) {
      alert("Please add a response before submitting.");
      return;
    }

    try {
      // Make an API call to submit the student's response
      const response = await fetch(
        `http://localhost:5000/api/feedback/respond/${feedbackId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ response: responseText }),
        }
      );

      if (response.ok) {
        alert("Response submitted successfully.");
        setStudentResponse((prevResponses) => {
          const newResponses = { ...prevResponses };
          delete newResponses[feedbackId]; // Clear the response after submission
          return newResponses;
        });
      } else {
        throw new Error("Failed to submit response");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="feedback-section">
      <h1 style={{ color: "black", textAlign: "center" }}>Feedback Section</h1>
      {loading ? (
        <p>Loading feedback...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : feedbacks.length > 0 ? (
        <div className="feedback-list">
          {feedbacks.slice(4).map((feedback, index) => (
            <div key={index} className="feedback-card">
              <h3 style={{ color: "black" }}>{feedback.feedName}</h3>
              <div className="feedback-info">
                <p>
                  <strong>Student Name:</strong> {feedback.studentInfo?.name}
                </p>
                <p>
                  <strong>Roll No:</strong> {feedback.studentInfo?.rollNo}
                </p>
                <p>
                  <strong>Email:</strong> {feedback.studentInfo?.email}
                </p>
                <p>
                  <strong>Feedback:</strong> {feedback?.feedback}
                </p>
              </div>
              <p className="feedback-date">
                <small>
                  Submitted on: {new Date(feedback.createdAt).toLocaleString()}
                </small>
              </p>
              {/* Student's Response Form */}
              <div className="response-form">
                <textarea
                  placeholder="Add your response here..."
                  value={studentResponse[feedback._id] || ""}
                  onChange={(e) => handleInputChange(e, feedback._id)}
                />
                <button onClick={() => handleSubmit(feedback._id)}>
                  Submit Response
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No feedback available.</p>
      )}
    </div>
  );
};

export default Feedbackk;
