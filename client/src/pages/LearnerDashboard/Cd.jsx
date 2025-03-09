import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { motion } from "framer-motion";
import "../../styles/Courses.css";

const Cd = () => {
  const { user, enrollCourse } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  const course = location.state.course;

  const handleEnrollClick = () => {
    if (!user.enrolledCourses.some((c) => c.id === course.id)) {
      enrollCourse(course); // Add the course to enrolled courses
      alert(`You have successfully enrolled in "${course.title}"!`);
      navigate("/enrolled-courses"); // Redirect to enrolled courses page
    } else {
      alert(`You are already enrolled in "${course.title}".`);
    }
  };

  return (
    <div className="course-detail-container">
      <h1>{course.title}</h1>
      <p>Instructor: {course.teacher}</p>
      <p className="course-description">{course.description}</p>
      <motion.button
        onClick={handleEnrollClick}
        className="enroll-button"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Enroll Now
      </motion.button>
      <motion.button
        onClick={() => navigate("/courses")}
        className="back-button"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Back to Courses
      </motion.button>
    </div>
  );
};

export default Cd;
