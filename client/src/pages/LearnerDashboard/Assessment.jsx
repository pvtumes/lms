// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Assessment.css"; // Import the CSS file for styling

// const Assessment = ({ assessmentType }) => {
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [answers, setAnswers] = useState([]);
//   const [showResult, setShowResult] = useState(false);
//   const [score, setScore] = useState(0);
//   const navigate = useNavigate();

//   // Define 10 questions for each assessment type
//   const questions = {
//     java: [
//       {
//         id: 1,
//         question: "What is Java?",
//         options: ["A language", "A coffee", "A car"],
//         correctAnswer: "A language",
//       },
//       {
//         id: 2,
//         question: "What is JVM?",
//         options: [
//           "Java Virtual Machine",
//           "Java Virtual Memory",
//           "Java Virtual Method",
//         ],
//         correctAnswer: "Java Virtual Machine",
//       },
//       {
//         id: 3,
//         question: "What is a class in Java?",
//         options: ["A blueprint for objects", "A method", "A variable"],
//         correctAnswer: "A blueprint for objects",
//       },
//       {
//         id: 4,
//         question: "What is inheritance in Java?",
//         options: [
//           "A way to inherit properties from a parent class",
//           "A type of loop",
//           "A method",
//         ],
//         correctAnswer: "A way to inherit properties from a parent class",
//       },
//       // Add 6 more Java questions...
//     ],
//     sql: [
//       {
//         id: 1,
//         question: "What is SQL?",
//         options: [
//           "Structured Query Language",
//           "Simple Query Language",
//           "Standard Query Language",
//         ],
//         correctAnswer: "Structured Query Language",
//       },
//       {
//         id: 2,
//         question: "What is a primary key?",
//         options: ["A unique identifier", "A foreign key", "A type of join"],
//         correctAnswer: "A unique identifier",
//       },
//       {
//         id: 3,
//         question: "What is a JOIN in SQL?",
//         options: [
//           "Combines rows from two or more tables",
//           "Deletes rows from a table",
//           "Updates rows in a table",
//         ],
//         correctAnswer: "Combines rows from two or more tables",
//       },
//       {
//         id: 4,
//         question: "What is the WHERE clause used for?",
//         options: ["Filtering records", "Sorting records", "Grouping records"],
//         correctAnswer: "Filtering records",
//       },
//       // Add 6 more SQL questions...
//     ],
//     react: [
//       {
//         id: 1,
//         question: "What is React?",
//         options: [
//           "A JavaScript library for building user interfaces",
//           "A programming language",
//           "A database management system",
//         ],
//         correctAnswer: "A JavaScript library for building user interfaces",
//       },
//       {
//         id: 2,
//         question: "What is JSX?",
//         options: [
//           "A syntax extension for JavaScript",
//           "A type of CSS",
//           "A state management tool",
//         ],
//         correctAnswer: "A syntax extension for JavaScript",
//       },
//       {
//         id: 3,
//         question: "What is a component in React?",
//         options: [
//           "A reusable piece of UI",
//           "A function that returns HTML",
//           "A state management tool",
//         ],
//         correctAnswer: "A reusable piece of UI",
//       },
//       {
//         id: 4,
//         question: "What is the purpose of state in React?",
//         options: [
//           "To store and manage data that can change over time",
//           "To define static data",
//           "To handle routing",
//         ],
//         correctAnswer: "To store and manage data that can change over time",
//       },
//       {
//         id: 5,
//         question: "What is the virtual DOM?",
//         options: [
//           "A lightweight copy of the real DOM",
//           "A database for React components",
//           "A state management tool",
//         ],
//         correctAnswer: "A lightweight copy of the real DOM",
//       },
//       // Add 5 more React questions...
//     ],
//     python: [
//       {
//         id: 1,
//         question: "What is Python?",
//         options: [
//           "A high-level programming language",
//           "A type of snake",
//           "A database management system",
//         ],
//         correctAnswer: "A high-level programming language",
//       },
//       {
//         id: 2,
//         question: "What is a list in Python?",
//         options: [
//           "A collection of ordered and mutable elements",
//           "A function",
//           "A type of loop",
//         ],
//         correctAnswer: "A collection of ordered and mutable elements",
//       },
//       {
//         id: 3,
//         question: "What is a dictionary in Python?",
//         options: [
//           "A collection of key-value pairs",
//           "A type of list",
//           "A function",
//         ],
//         correctAnswer: "A collection of key-value pairs",
//       },
//       {
//         id: 4,
//         question: "What is the purpose of the `if` statement in Python?",
//         options: [
//           "To execute code conditionally",
//           "To define a function",
//           "To create a loop",
//         ],
//         correctAnswer: "To execute code conditionally",
//       },
//       {
//         id: 5,
//         question: "What is the `range()` function used for?",
//         options: [
//           "To generate a sequence of numbers",
//           "To define a list",
//           "To create a dictionary",
//         ],
//         correctAnswer: "To generate a sequence of numbers",
//       },
//       // Add 5 more Python questions...
//     ],
//   };

//   const handleAnswer = (answer) => {
//     // Save the user's answer
//     setAnswers([...answers, answer]);

//     // Move to the next question
//     if (currentQuestion < questions[assessmentType].length - 1) {
//       setCurrentQuestion(currentQuestion + 1);
//     } else {
//       // If it's the last question, calculate the score
//       calculateScore();
//       setShowResult(true);
//     }
//   };

//   const calculateScore = () => {
//     let correctAnswers = 0;
//     questions[assessmentType].forEach((question, index) => {
//       if (answers[index] === question.correctAnswer) {
//         correctAnswers++;
//       }
//     });
//     setScore(correctAnswers);
//   };

//   const handleRetry = () => {
//     // Reset the assessment
//     setCurrentQuestion(0);
//     setAnswers([]);
//     setShowResult(false);
//     setScore(0);
//   };

//   const handleBackToDashboard = () => {
//     navigate("/learner-dashboard");
//   };

//   return (
//     <div className="assessment-container">
//       <h1>{assessmentType.toUpperCase()} Assessment</h1>
//       {!showResult ? (
//         <div className="question-card">
//           <h3 className="question-text">
//             Question {currentQuestion + 1}:{" "}
//             {questions[assessmentType][currentQuestion].question}
//           </h3>
//           <div className="options">
//             {questions[assessmentType][currentQuestion].options.map(
//               (option, index) => (
//                 <button key={index} onClick={() => handleAnswer(option)}>
//                   {option}
//                 </button>
//               )
//             )}
//           </div>
//         </div>
//       ) : (
//         <div className="result-section">
//           <h2>Your Result</h2>
//           <p className="result-text">
//             {score}/{questions[assessmentType].length}
//           </p>
//           <button onClick={handleRetry}>Retry Assessment</button>
//           <button onClick={handleBackToDashboard}>Back to Dashboard</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Assessment;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // For making HTTP requests
import "./Assessment.css"; // Import the CSS file for styling

const Assessment = ({ assessmentType }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  // Get the user's email from local storage or context
  const userEmail = localStorage.getItem("userEmail"); // Replace with your actual user email source

  // Define 10 questions for each assessment type
  const questions = {
    java: [
      {
        id: 1,
        question: "What is Java?",
        options: ["A language", "A coffee", "A car"],
        correctAnswer: "A language",
      },
      {
        id: 2,
        question: "What is JVM?",
        options: [
          "Java Virtual Machine",
          "Java Virtual Memory",
          "Java Virtual Method",
        ],
        correctAnswer: "Java Virtual Machine",
      },
      {
        id: 3,
        question: "What is a class in Java?",
        options: ["A blueprint for objects", "A method", "A variable"],
        correctAnswer: "A blueprint for objects",
      },
      {
        id: 4,
        question: "What is inheritance in Java?",
        options: [
          "A way to inherit properties from a parent class",
          "A type of loop",
          "A method",
        ],
        correctAnswer: "A way to inherit properties from a parent class",
      },
      // Add 6 more Java questions...
    ],
    // Add other assessment types (sql, react, python)...
  };

  const handleAnswer = (answer) => {
    // Save the user's answer
    setAnswers([...answers, answer]);

    // Move to the next question
    if (currentQuestion < questions[assessmentType].length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // If it's the last question, calculate the score
      calculateScore();
    }
  };

  const calculateScore = async () => {
    let correctAnswers = 0;
    questions[assessmentType].forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
    setShowResult(true);

    // Send the score and email to the backend
    try {
      const response = await axios.post(
        "http://localhost:5000/api/save-score",
        {
          email: userEmail,
          assessmentType: assessmentType,
          score: correctAnswers,
        }
      );

      if (response.status === 200) {
        console.log("Score saved successfully!");
      }
    } catch (error) {
      console.error("Error saving score:", error);
    }
  };

  const handleRetry = () => {
    // Reset the assessment
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setScore(0);
  };

  const handleBackToDashboard = () => {
    navigate("/learner-dashboard");
  };

  return (
    <div className="assessment-container">
      <h1>{assessmentType.toUpperCase()} Assessment</h1>
      {!showResult ? (
        <div className="question-card">
          <h3 className="question-text">
            Question {currentQuestion + 1}:{" "}
            {questions[assessmentType][currentQuestion].question}
          </h3>
          <div className="options">
            {questions[assessmentType][currentQuestion].options.map(
              (option, index) => (
                <button key={index} onClick={() => handleAnswer(option)}>
                  {option}
                </button>
              )
            )}
          </div>
        </div>
      ) : (
        <div className="result-section">
          <h2>Your Result</h2>
          <p className="result-text">
            {score}/{questions[assessmentType].length}
          </p>
          <button onClick={handleRetry}>Retry Assessment</button>
          <button onClick={handleBackToDashboard}>Back to Dashboard</button>
        </div>
      )}
    </div>
  );
};

export default Assessment;