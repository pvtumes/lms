import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/CourseManagement.css";

const CourseManagement = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All"); // New state for price filter
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

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

  const handleEnroll = (course) => {
    console.log(`Enrolled in Course: ${course.title}`);
    // Navigate to PaymentPage and pass course details via state
    navigate("/payment", { state: { course } });
  };

  return (
    <div className="courses-container">
      <h1 className="mentor-dashboard-name">Courses</h1>

      <div className="top-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="domain-filter">
          <select
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
          >
            {["All", ...new Set(courses.map((course) => course.domain))].map(
              (domain) => (
                <option key={domain} value={domain}>
                  {domain}
                </option>
              )
            )}
          </select>
        </div>

        {/* Dropdown for filtering by Free or Paid */}
        <div className="domain-filter">
          <select
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(e.target.value)}
          >
            <option value="All">All Courses</option>
            <option value="Free">Free Courses</option>
            <option value="Paid">Paid Courses</option>
          </select>
        </div>
      </div>

      {loading && <p>Loading courses...</p>}

      <div className="courses-grid">
        {courses
          .filter(
            (course) =>
              course.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
              (selectedDomain === "All" || course.domain === selectedDomain) &&
              (selectedPrice === "All" ||
                (selectedPrice === "Free" && course.price === "Free") ||
                (selectedPrice === "Paid" && course.price !== "Free"))
          )
          .map((course) => (
            <motion.div
              key={course._id} // Use _id for MongoDB documents
              className="course-card"
              whileHover={{ scale: 1.05 }}
            >
              <h3>{course.title}</h3>
              <p>Instructor: {course.teacher}</p>
              <p>Price: {course.price}</p>
              <p>Domain: {course.domain}</p>
              <button
                className="enroll-button"
                onClick={() => handleEnroll(course)} // Navigate to PaymentPage
              >
                Enroll Now
              </button>
            </motion.div>
          ))}
      </div>
    </div>
  );
};

export default CourseManagement;
