import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../../styles/MentorDashboard.css";
import {
  Calendar,
  Users,
  Book,
  FileText,
  UserCheck,
  Bell,
  Plus,
  Edit,
  Trash2,
} from "lucide-react";

const MentorDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard"); // Default to 'dashboard'
  const [showCreateCourseButton, setShowCreateCourseButton] = useState(false); // State for Create Course button
  const [showCreateAssessmentButton, setShowCreateAssessmentButton] =
    useState(false); // State for Create Assessment button
  const [showCreateFeedbackButton, setShowCreateFeedbackButton] =
    useState(false); // State for Create Feedback button
  const [showCreateAnnouncementButton, setShowCreateAnnouncementButton] =
    useState(false); // State for Create Announcement button
  const navigate = useNavigate();

  useEffect(() => {
    // Set the default section to 'dashboard' when the component mounts
    setActiveSection("dashboard");
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const handleLogout = () => {
    alert("Logged out successfully!");
    navigate("/login");
  };

  const handleSectionClick = (section) => {
    setActiveSection(section);
    // Show the Create Course button only when the "courses" section is active
    setShowCreateCourseButton(section === "mentor-courses");
    // Show the Create Assessment button only when the "assessments" section is active
    setShowCreateAssessmentButton(section === "assessments");
    // Show the Create Feedback button only when the "feedback" section is active
    setShowCreateFeedbackButton(section === "feed");
    // Show the Create Announcement button only when the "announcements" section is active
    setShowCreateAnnouncementButton(section === "announcements");
  };

  const handleCreateCourseNavigation = () => {
    navigate("/mentor-courses"); // Navigate to /courses route
  };

  const handleCreateAssessmentNavigation = () => {
    navigate("/test"); // Navigate to /test route
  };

  const handleCreateFeedbackNavigation = () => {
    navigate("/feed"); // Navigate to /feedback route
  };

  const handleCreateAnnouncementNavigation = () => {
    navigate("/announcement"); // Navigate to /announcement route
  };

  const renderMainContent = () => {
    if (activeSection === "mentor-courses") {
      return (
        <div className="courses-section">
          <h1>Manage Courses</h1>
          <p>Create, update, and manage courses here.</p>
          {/* Display the Create Course button if showCreateCourseButton is true */}
          {showCreateCourseButton && (
            <motion.button
              className="create-course-button"
              onClick={handleCreateCourseNavigation}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Plus size={16} /> Create Course
            </motion.button>
          )}
        </div>
      );
    }

    if (activeSection === "assessments") {
      return (
        <div className="assessments-section">
          <h1>Assessments</h1>
          <p>Create and manage assessments here.</p>
          {/* Display the Create Assessment button if showCreateAssessmentButton is true */}
          {showCreateAssessmentButton && (
            <motion.button
              className="create-assessment-button"
              onClick={handleCreateAssessmentNavigation}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Plus size={16} /> Create Assessment
            </motion.button>
          )}
        </div>
      );
    }

    if (activeSection === "feed") {
      return (
        <div className="feedback-section">
          <h1>Feedback</h1>
          <p>View and manage feedback from students here.</p>
          {/* Display the Create Feedback button if showCreateFeedbackButton is true */}
          {showCreateFeedbackButton && (
            <motion.button
              className="create-feedback-button"
              onClick={handleCreateFeedbackNavigation}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Plus size={16} /> Create Feedback
            </motion.button>
          )}
        </div>
      );
    }

    if (activeSection === "announcements") {
      return (
        <div className="announcements-section">
          <h1>Announcements</h1>
          <p>Create and manage announcements here.</p>
          {/* Display the Create Announcement button if showCreateAnnouncementButton is true */}
          {showCreateAnnouncementButton && (
            <motion.button
              className="create-announcement-button"
              onClick={handleCreateAnnouncementNavigation}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Plus size={16} /> Create Announcement
            </motion.button>
          )}
        </div>
      );
    }

    if (activeSection === "dashboard") {
      return (
        <div className="welcome-section">
          <h1>Welcome Back, Mentor! 👋</h1>
          <p>Here's an overview of your platform:</p>

          {/* Stats Cards */}
          <div className="dashboard-stats">
            <div className="stat-card">
              <h3>Total Courses</h3>
              <p>10</p>
            </div>
            <div className="stat-card">
              <h3>Total Students</h3>
              <p>120</p>
            </div>
            <div className="stat-card">
              <h3>Pending Assessments</h3>
              <p>5</p>
            </div>
          </div>
        </div>
      );
    }

    return null; // Render other sections if needed
  };

  return (
    <div
      className={`mentor-dashboard ${darkMode ? "dark-mode" : "light-mode"}`}
    >
      {/* Two-Column Layout */}
      <div className="two-column-layout">
        {/* Left Side: Sidebar */}
        <motion.div
          className="sidebar"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Welcome Message at the Top of Sidebar */}
          <div className="sidebar-welcome">
            <h2>Welcome Back, Mentor! 👋</h2>
          </div>

          {/* Sidebar Navigation */}
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
                    activeSection === "mentor-courses" ? "active" : ""
                  }`}
                  onClick={() => handleSectionClick("mentor-courses")}
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
                    activeSection === "feed" ? "active" : ""
                  }`}
                  onClick={() => handleSectionClick("feed")}
                >
                  💬 Feedback
                </button>
              </li>
              <li>
                <button
                  className={`nav-button ${
                    activeSection === "announcements" ? "active" : ""
                  }`}
                  onClick={() => handleSectionClick("announcements")}
                >
                  📢 Announcements
                </button>
              </li>
            </ul>
          </nav>

          {/* Logout Button */}
          <button className="logout-button nav-button" onClick={handleLogout}>
            🚪 Logout
          </button>
        </motion.div>

        {/* Right Side: Main Content */}
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

export default MentorDashboard;
