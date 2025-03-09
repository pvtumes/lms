import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import "../../styles/Courses.css";

const EnrolledCourses = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="enrolled-courses-container">
      <h1>Your Enrolled Courses</h1>
      <div className="courses-grid">
        {user.enrolledCourses.map((course) => (
          <div key={course.id} className="course-card">
            <h3>{course.title}</h3>
            <p>Instructor: {course.teacher}</p>
            <p className="course-description">{course.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnrolledCourses;
