import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios"; // Import Axios
import "../../styles/CourseManagement.css";

const CourseManagement = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("All");
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: "",
    price: "Free",
    teacher: "",
    domain: "",
  });
  const [editCourseId, setEditCourseId] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    fetchCourses();
  }, []);

  // Fetch courses from the backend
  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/courses");
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
      alert("Failed to fetch courses!");
    }
    setLoading(false);
  };

  // Handle search input
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle domain selection
  const handleDomainChange = (event) => {
    setSelectedDomain(event.target.value);
  };

  // Filter courses based on search term and selected domain
  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesDomain =
      selectedDomain === "All" || course.domain === selectedDomain;
    return matchesSearch && matchesDomain;
  });

  // Get unique domains for the filter
  const domains = ["All", ...new Set(courses.map((course) => course.domain))];

  // Handle adding a new course
  const handleAddCourse = () => {
    setShowAddCourseModal(true);
    setEditCourseId(null); // Reset edit mode
    setNewCourse({ title: "", price: "Free", teacher: "", domain: "" }); // Clear form
  };

  // Handle saving a new course to the backend
  const handleSaveCourse = async () => {
    if (!newCourse.title || !newCourse.teacher || !newCourse.domain) {
      alert("All fields are required!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/courses",
        {
          title: newCourse.title,
          price: "Free",
          teacher: newCourse.teacher,
          domain: newCourse.domain,
        }
      );

      // Update local state with new course
      setCourses([...courses, response.data.newCourse]);
      setShowAddCourseModal(false);
      setNewCourse({ title: "", price: "Free", teacher: "", domain: "" });
    } catch (error) {
      console.error("Error creating course:", error);
      alert("Failed to create course!");
    }
  };

  // Handle going back to the dashboard
  const handleBackToDashboard = () => {
    navigate(-1); // Go back to the previous route
  };

  return (
    <div className="courses-container">
      <h1 className="mentor-dashboard-name">Mentor Dashboard</h1>

      <div className="top-section">
        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        {/* Domain Filter Dropdown */}
        <div className="domain-filter">
          <select value={selectedDomain} onChange={handleDomainChange}>
            {domains.map((domain) => (
              <option key={domain} value={domain}>
                {domain}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Add Course Button */}
      <button className="add-course-button" onClick={handleAddCourse}>
        + Add Course
      </button>

      {/* Show loading state */}
      {loading && <p>Loading courses...</p>}

      {/* Courses Grid */}
      <div className="courses-grid">
        {filteredCourses.map((course) => (
          <motion.div
            key={course.id}
            className="course-card"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <h3>{course.title}</h3>
            <p>Instructor: {course.teacher}</p>
            <p>Price: {course.price}</p>
            <p>Domain: {course.domain}</p>
          </motion.div>
        ))}
      </div>

      {/* Back to Dashboard Button */}
      <div className="back-to-dashboard">
        <button className="back-button" onClick={handleBackToDashboard}>
          Back to Dashboard
        </button>
      </div>

      {/* Add Course Modal */}
      {showAddCourseModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New Course</h2>
            <input
              type="text"
              placeholder="Course Title"
              value={newCourse.title}
              onChange={(e) =>
                setNewCourse({ ...newCourse, title: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Instructor"
              value={newCourse.teacher}
              onChange={(e) =>
                setNewCourse({ ...newCourse, teacher: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Domain Area"
              value={newCourse.domain}
              onChange={(e) =>
                setNewCourse({ ...newCourse, domain: e.target.value })
              }
            />
            <button onClick={handleSaveCourse}>Save</button>
            <button onClick={() => setShowAddCourseModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseManagement;
