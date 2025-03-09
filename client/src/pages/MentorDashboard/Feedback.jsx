import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/MentorFeedbackForm.css"; // Import the CSS file

const Feedback = () => {
  const [feedbackQuestions, setFeedbackQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [newOptions, setNewOptions] = useState(""); // Options for the question (e.g., "1,2,3,4,5")
  const [studentResponses, setStudentResponses] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null); // Track the index of the question being edited
  const [editedQuestion, setEditedQuestion] = useState(""); // Store the edited question text
  const [editedOptions, setEditedOptions] = useState(""); // Store the edited options

  const mentorId = "MENTOR_ID"; // Replace with actual mentor ID
  const feedbackId = "FEEDBACK_ID"; // Replace with actual feedback ID

  // Fetch feedback data from the backend
  useEffect(() => {
    const fetchFeedbackData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/feedback/feedback-data?mentorId=${mentorId}`
        );
        setFeedbackQuestions(response.data.questions || []);
        setStudentResponses(response.data.studentResponses || []);
      } catch (error) {
        console.error("Error fetching feedback data:", error);
      }
    };

    fetchFeedbackData();
  }, [mentorId]);

  // Add a new question to the feedback form
  const addQuestion = async () => {
    if (newQuestion.trim() !== "" && newOptions.trim() !== "") {
      if (feedbackQuestions.length < 5) {
        const optionsArray = newOptions
          .split(",")
          .map((option) => option.trim());

        const newFeedbackQuestion = {
          question: newQuestion,
          options: optionsArray,
        };

        try {
          const response = await axios.post(
            "http://localhost:5000/api/feedback/save-questions",
            {
              mentorId: mentorId,
              questions: [...feedbackQuestions, newFeedbackQuestion],
            }
          );

          if (response.status === 201) {
            setFeedbackQuestions([...feedbackQuestions, newFeedbackQuestion]);
            setNewQuestion("");
            setNewOptions("");
          }
        } catch (error) {
          console.error("Error saving feedback questions:", error);
        }
      } else {
        alert("You can only add up to 5 questions.");
      }
    } else {
      alert("Please enter both a question and options.");
    }
  };

  // Delete a question
  const deleteQuestion = async (index) => {
    const updatedQuestions = feedbackQuestions.filter((_, i) => i !== index);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/feedback/save-questions",
        {
          mentorId: mentorId,
          questions: updatedQuestions,
        }
      );

      if (response.status === 201) {
        setFeedbackQuestions(updatedQuestions);
      }
    } catch (error) {
      console.error("Error deleting feedback question:", error);
    }
  };

  // Start editing a question
  const startEditing = (index) => {
    setEditingIndex(index);
    setEditedQuestion(feedbackQuestions[index].question);
    setEditedOptions(feedbackQuestions[index].options.join(","));
  };

  // Save the edited question
  const saveEditedQuestion = async () => {
    if (editedQuestion.trim() !== "" && editedOptions.trim() !== "") {
      const optionsArray = editedOptions
        .split(",")
        .map((option) => option.trim());

      const updatedQuestions = [...feedbackQuestions];
      updatedQuestions[editingIndex] = {
        question: editedQuestion,
        options: optionsArray,
      };

      try {
        const response = await axios.post(
          "http://localhost:5000/api/feedback/save-questions",
          {
            mentorId: mentorId,
            questions: updatedQuestions,
          }
        );

        if (response.status === 201) {
          setFeedbackQuestions(updatedQuestions);
          setEditingIndex(null); // Exit editing mode
          setEditedQuestion(""); // Clear the edited question
          setEditedOptions(""); // Clear the edited options
        }
      } catch (error) {
        console.error("Error saving edited question:", error);
      }
    }
  };

  // Handle student feedback submission
  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const responses = {};

    feedbackQuestions.forEach((question, index) => {
      responses[question.question] = formData.get(`question-${index}`);
    });

    try {
      const response = await axios.post(
        "http://localhost:5000/api/feedback/save-response",
        {
          feedbackId: feedbackId,
          studentId: "STUDENT_ID", // Replace with actual student ID
          responses: Object.entries(responses).map(([question, answer]) => ({
            question,
            answer,
          })),
        }
      );

      if (response.status === 201) {
        setStudentResponses([...studentResponses, responses]);
        e.target.reset(); // Reset the form after submission
      }
    } catch (error) {
      console.error("Error saving student response:", error);
    }
  };

  return (
    <div className="mentor-container">
      <h2>Mentor: Create Feedback Form</h2>

      {/* Feedback Questions Section */}
      <div className="question-input">
        <input
          type="text"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder="Enter a feedback question"
        />
        <input
          type="text"
          value={newOptions}
          onChange={(e) => setNewOptions(e.target.value)}
          placeholder="Enter options (comma-separated, e.g., 1,2,3,4,5)"
        />
        <button onClick={addQuestion}>Add Question</button>
      </div>

      {/* Display the list of questions added by the mentor */}
      <div className="questions-list">
        <h3>Feedback Questions:</h3>
        {feedbackQuestions.length === 0 ? (
          <p>No questions added yet.</p>
        ) : (
          <ul>
            {feedbackQuestions.map((question, index) => (
              <li key={index}>
                {editingIndex === index ? (
                  // Edit mode
                  <>
                    <input
                      type="text"
                      value={editedQuestion}
                      onChange={(e) => setEditedQuestion(e.target.value)}
                      placeholder="Edit question"
                    />
                    <input
                      type="text"
                      value={editedOptions}
                      onChange={(e) => setEditedOptions(e.target.value)}
                      placeholder="Edit options (comma-separated)"
                    />
                    <button onClick={saveEditedQuestion}>Save</button>
                  </>
                ) : (
                  // Display mode
                  <>
                    <strong>{question.question}</strong> (
                    {question.options.join(", ")})
                    <button onClick={() => startEditing(index)}>Edit</button>
                    <button onClick={() => deleteQuestion(index)}>
                      Delete
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Student Feedback Form */}
      <div className="student-feedback-form">
        <h3>Student Feedback Submission:</h3>
        <form onSubmit={handleFeedbackSubmit}>
          {feedbackQuestions.map((question, index) => (
            <div key={index} className="feedback-question">
              <label>
                {question.question} ({question.options.join(", ")})
              </label>
              <select name={`question-${index}`} required>
                <option value="">Select an option</option>
                {question.options.map((option, i) => (
                  <option key={i} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ))}
          <button type="submit">Submit Feedback</button>
        </form>
      </div>

      {/* Display all student feedback responses */}
      <div className="feedback-responses">
        <h3>Student Feedback Responses:</h3>
        {studentResponses.length === 0 ? (
          <p>No feedback responses yet.</p>
        ) : (
          studentResponses.map((response, index) => (
            <div key={index} className="response-item">
              <h4>Response {index + 1}:</h4>
              <ul>
                {Object.entries(response).map(([question, answer]) => (
                  <li key={question}>
                    <strong>{question}:</strong> {answer}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Feedback;
