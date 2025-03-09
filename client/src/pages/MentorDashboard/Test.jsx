import React, { useState } from "react";
import "../../styles/Test.css";

const Test = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [newOption, setNewOption] = useState("");
  const [correctOption, setCorrectOption] = useState("");

  const addOption = () => {
    if (newOption.trim() !== "") {
      setOptions([...options, newOption]);
      setNewOption("");
    }
  };

  const addQuestion = () => {
    if (newQuestion.trim() !== "" && options.length > 0) {
      setQuestions([
        ...questions,
        { question: newQuestion, options: [...options], correctOption },
      ]);
      setNewQuestion("");
      setOptions([]);
      setCorrectOption("");
    } else {
      alert("Please add a question with options.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const assessmentData = {
      title,
      description,
      duration,
      questions,
    };

    try {
      const response = await fetch("http://localhost:5000/api/assessments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(assessmentData),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to send assessment data: ${errorMessage}`);
      }

      console.log("Assessment data sent successfully.");

      setTitle("");
      setDescription("");
      setDuration("");
      setQuestions([]);
      alert("Assessment Created Successfully!");
    } catch (error) {
      console.error("Error sending assessment data:", error.message);
      alert(`Failed to send assessment data: ${error.message}`);
    }
  };

  return (
    <div className="assessment-container">
      <h2>Create Assessment</h2>
      <form onSubmit={handleSubmit}>
        <label style={{ color: "black" }}>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label style={{ color: "black" }}>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>

        <label style={{ color: "black" }}>Time Duration (minutes):</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />

        <label style={{ color: "black" }}>Add Question:</label>
        <input
          type="text"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
        />

        <label style={{ color: "black" }}>Add Options:</label>
        <div className="option-input">
          <input
            type="text"
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
          />
          <button type="button" onClick={addOption}>
            Add Option
          </button>
        </div>

        <ul className="option-list">
          {options.map((opt, index) => (
            <li key={index}>
              <input
                type="radio"
                style={{ color: "black" }}
                name="correct-option"
                value={opt}
                onChange={() => setCorrectOption(opt)}
              />
              <p style={{ color: "black" }}>{opt}</p>
              {opt}
            </li>
          ))}
        </ul>

        <button type="button" onClick={addQuestion}>
          Add Question
        </button>

        <h3>Questions List</h3>
        <ul className="question-list">
          {questions.map((q, index) => (
            <li key={index}>
              <strong>{q.question}</strong>
              <ul>
                {q.options.map((opt, idx) => (
                  <li
                    key={idx}
                    style={{
                      color: opt === q.correctOption ? "green" : "black",
                    }}
                  >
                    {opt}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <button type="submit" className="submit-btn">
          Create Assessment
        </button>
      </form>
    </div>
  );
};

export default Test;
