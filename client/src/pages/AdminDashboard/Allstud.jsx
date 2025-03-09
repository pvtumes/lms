import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Allstud.css"; // Assuming the CSS file is in the styles folder

const AllStud = () => {
  const [students, setStudents] = useState([]); // Store the list of students
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch all students from the API on component mount
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/auth/students"
        );
        setStudents(response.data); // Set the students data
        setLoading(false); // Set loading to false once the data is fetched
      } catch (err) {
        setError("Failed to fetch students."); // Set error if the request fails
        setLoading(false); // Set loading to false
      }
    };

    fetchStudents();
  }, []); // Empty dependency array to run only once on mount

  if (loading) {
    return <div className="loading-container">Loading students...</div>; // Display loading text while fetching
  }

  if (error) {
    return <div className="error-message">{error}</div>; // Display error message if the request fails
  }

  return (
    <div className="all-student-container">
      <h1 className="section-title">All Students</h1>
      {students.length === 0 ? (
        <p className="no-students-message">No students found.</p>
      ) : (
        <div className="student-list">
          {students.map((student) => (
            <div key={student._id} className="student-card">
              <div className="student-card-header">
                
                <p className="student-rollNo">Role: {student.role}</p>
              </div>
              <p className="student-email">
                <strong>Email:</strong> {student.email}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllStud;
