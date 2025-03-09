import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../../styles/AdminDashboard.css";
import { Plus } from "lucide-react";

const AdminDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard"); // Default to 'dashboard'
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [showCreateAnnouncement, setShowCreateAnnouncement] = useState(false);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [showAddMentor, setShowAddMentor] = useState(false);
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
    // Reset all "Add" button states
    setShowCreateEvent(section === "events");
    setShowCreateAnnouncement(section === "announcements");
    setShowAddStudent(section === "students");
    setShowAddMentor(section === "mentors");
  };

  const handleAddStudentClick = () => {
    navigate("/allstud"); // Navigate to /allstud for students
  };

  const handleAddMentorClick = () => {
    navigate("/allmentor"); // Navigate to /allmentor for mentors
  };

  const renderMainContent = () => {
    if (activeSection === "events") {
      return (
        <Eventss />
      );
    }

    if (activeSection === "announcements") {
      return (
        <div className="announcements-section">
          <h1>Announcements</h1>
          <p>Create and manage announcements here.</p>
          {showCreateAnnouncement && (
            <button
              className="add-button"
              onClick={() => navigate("/create-announcement")}
            >
              <Plus size={16} /> Create Announcement
            </button>
          )}
        </div>
      );
    }

    if (activeSection === "students") {
      return (
        <div className="students-section">
          <h1>Manage Students</h1>
          <p>View and manage student accounts here.</p>
          {showAddStudent && (
            <button className="add-button" onClick={handleAddStudentClick}>
              <Plus size={16} /> All Student
            </button>
          )}
        </div>
      );
    }

    if (activeSection === "mentors") {
      return (
        <div className="mentors-section">
          <h1>Manage Mentors</h1>
          <p>View and manage mentor accounts here.</p>
          {showAddMentor && (
            <button className="add-button" onClick={handleAddMentorClick}>
              <Plus size={16} /> All Mentor
            </button>
          )}
        </div>
      );
    }

    if (activeSection === "courses") {
      return (
        <div className="courses-section">
          <h1>Manage Courses</h1>
          <p>Create, update, and manage courses here.</p>
        </div>
      );
    }

    if (activeSection === "progress") {
      return (
        <div className="progress-section">
          <h1>Student Progress</h1>
          <p>Track and view student progress here.</p>
        </div>
      );
    }

    if (activeSection === "dashboard") {
      return (
        <div className="welcome-section">
          <h1>Welcome Back, Admin! 👋</h1>
          <p>Here's an overview of your platform:</p>

          {/* Stats Cards */}
          <div className="dashboard-stats">
            <div className="stat-card">
              <h3>Total Students</h3>
              <p>120</p>
            </div>
            <div className="stat-card">
              <h3>Total Mentors</h3>
              <p>15</p>
            </div>
            <div className="stat-card">
              <h3>Active Courses</h3>
              <p>25</p>
            </div>
          </div>
        </div>
      );
    }

    return null; // Render other sections if needed
  };

  return (
    <div className={`admin-dashboard ${darkMode ? "dark-mode" : "light-mode"}`}>
      {/* Dark Mode Toggle Button */}
      <motion.button
        className="dark-mode-toggle"
        onClick={toggleDarkMode}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {darkMode ? "🌙" : "☀️"}
      </motion.button>

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
            <h2>Welcome Back, Admin! 👋</h2>
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
                    activeSection === "events" ? "active" : ""
                  }`}
                  onClick={() => handleSectionClick("events")}
                >
                  🗓️ Upcoming Events
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
              <li>
                <button
                  className={`nav-button ${
                    activeSection === "students" ? "active" : ""
                  }`}
                  onClick={() => handleSectionClick("students")}
                >
                  👨‍🎓 Students
                </button>
              </li>
              <li>
                <button
                  className={`nav-button ${
                    activeSection === "mentors" ? "active" : ""
                  }`}
                  onClick={() => handleSectionClick("mentors")}
                >
                  👩‍🏫 Mentors
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

export default AdminDashboard;
