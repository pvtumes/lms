import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../../styles/LearnerDashboard.css";
import StudentsEventData from "./sde";

const LearnerDashboard = ({ eventss }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("purchased");
  const [activeSection, setActiveSection] = useState("dashboard");
  const navigate = useNavigate();

  useEffect(() => {
    setActiveSection("dashboard");
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const handleLogout = () => {
    alert("Logged out successfully!");
    navigate("/login");
  };

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleExploreCourses = () => {
    navigate("/courses");
  };

  const handleFeedbackClick = () => {
    navigate("/feedback"); // Navigate to the feedback route
  };

  const renderMainContent = () => {
    if (activeSection === "events") {
      return <StudentsEventData eventss={eventss} />;
    }

    if (activeSection === "dashboard") {
      return (
        <div className="welcome-section">
          <h1>Welcome Back, Learner! 👋</h1>
          <p>Here's your progress so far:</p>
          <div className="progress-bar-container">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "65%" }}></div>
            </div>
            <span className="progress-text">65% Completed</span>
          </div>
          <div className="dashboard-stats">
            <div className="stat-card">
              <h3>Courses Enrolled</h3>
              <p>5</p>
            </div>
            <div className="stat-card">
              <h3>Completed Courses</h3>
              <p>3</p>
            </div>
            <div className="stat-card">
              <h3>Certificates Earned</h3>
              <p>2</p>
            </div>
          </div>
        </div>
      );
    }

    if (activeSection === "courses") {
      return (
        <>
          <h1>My Courses</h1>
          <div className="tab-bar">
            <div
              className={`tab ${activeTab === "purchased" ? "active" : ""}`}
              onClick={() => handleTabClick("purchased")}
            >
              Purchased Courses
            </div>
          </div>
          <div className="courses-section">
            {activeTab === "purchased" ? (
              <div className="purchased-courses">
                <div className="empty-state">
                  <button
                    className="explore-button"
                    onClick={handleExploreCourses}
                  >
                    Explore Courses
                  </button>
                </div>
              </div>
            ) : (
              <div className="suggested-courses">
                <div className="empty-state">
                  <button
                    className="explore-button"
                    onClick={handleExploreCourses}
                  >
                    Explore Courses
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      );
    }

    if (activeSection === "assessments") {
      return (
        <div className={`assessments-section ${darkMode ? "dark-mode" : ""}`}>
          <h1 className="section-title">Assessments</h1>
          <div className="assessments-grid">
            {["Java", "SQL", "Python", "React"].map((subject) => (
              <motion.div
                key={subject}
                className="assessment-card"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <h3>{subject} Assessment</h3>
                <p>Test your {subject} skills with 20 questions.</p>
                <button
                  className="start-assessment-button"
                  onClick={() =>
                    navigate(`/${subject.toLowerCase()}-assessment`)
                  }
                >
                  Start Assessment
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      );
    }

    if (activeSection === "announce") {
      return (
        <div className="announcements-section">
          <h1>Announcements</h1>
          <p>Stay updated with the latest announcements.</p>
          <button
            className="go-to-announcements"
            onClick={() => navigate("/announce")}
          >
            View Announcements
          </button>
          {/* Feedback button after announcement */}
          <div className="feedback-section">
            <button
              className="feedback-button"
              onClick={() => navigate("/feedbackk")}
            >
              Feedback
            </button>
          </div>
        </div>
      );
    }

    if (activeSection === "settings") {
      return (
        <div className={`settings-section ${darkMode ? "dark-mode" : ""}`}>
          <h1 className="section-title">Settings</h1>
          <div className="settings-grid">
            <div className="setting-card">
              <h3>Theme</h3>
              <button className="theme-toggle-button" onClick={toggleDarkMode}>
                {darkMode
                  ? "Switch to Light Mode ☀️"
                  : "Switch to Dark Mode 🌙"}
              </button>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div
      className={`learner-dashboard ${darkMode ? "dark-mode" : "light-mode"}`}
    >
      <div className="two-column-layout">
        <motion.div
          className="sidebar"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="sidebar-welcome">
            <h2>Welcome Back, Learner! 👋</h2>
          </div>
          <nav className="sidebar-nav">
            <ul>
              <li>
                <button
                  className={`nav-button ${
                    activeSection === "dashboard" ? "active" : ""
                  }`}
                  onClick={() => handleSectionClick("dashboard")}
                >
                  🏠 Dashboard
                </button>
              </li>
              <li>
                <button
                  className={`nav-button ${
                    activeSection === "courses" ? "active" : ""
                  }`}
                  onClick={() => handleSectionClick("courses")}
                >
                  📚 Courses
                </button>
              </li>
              <li>
                <button
                  className={`nav-button ${
                    activeSection === "assessments" ? "active" : ""
                  }`}
                  onClick={() => handleSectionClick("assessments")}
                >
                  📝 Assessments
                </button>
              </li>
              <li>
                <button
                  className={`nav-button ${
                    activeSection === "events" ? "active" : ""
                  }`}
                  onClick={() => handleSectionClick("events")}
                >
                  🗓️ Events
                </button>
              </li>
              <li>
                <button
                  className={`nav-button ${
                    activeSection === "announce" ? "active" : ""
                  }`}
                  onClick={() => handleSectionClick("announce")}
                >
                  📢 Announcements & FeedBack
                </button>
              </li>
              
              <li>
                <button
                  className={`nav-button ${
                    activeSection === "settings" ? "active" : ""
                  }`}
                  onClick={() => handleSectionClick("settings")}
                >
                  ⚙️ Settings
                </button>
              </li>
            </ul>
          </nav>
          <button className="logout-button nav-button" onClick={handleLogout}>
            🚪 Logout
          </button>
        </motion.div>
        <motion.div
          className="main-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="content">{renderMainContent()}</div>
        </motion.div>
      </div>
    </div>
  );
};

export default LearnerDashboard;
