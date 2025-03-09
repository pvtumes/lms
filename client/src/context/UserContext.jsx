import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  // Load enrolled courses from localStorage on initial load
  useEffect(() => {
    const savedEnrolledCourses = localStorage.getItem("enrolledCourses");
    if (savedEnrolledCourses) {
      setEnrolledCourses(JSON.parse(savedEnrolledCourses));
    }
  }, []);

  // Save enrolled courses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("enrolledCourses", JSON.stringify(enrolledCourses));
  }, [enrolledCourses]);

  // Add a course to the enrolled list
  const enrollCourse = (course) => {
    if (!enrolledCourses.some((c) => c.id === course.id)) {
      setEnrolledCourses([...enrolledCourses, course]);
    }
  };

  return (
    <UserContext.Provider value={{ enrolledCourses, enrollCourse }}>
      {children}
    </UserContext.Provider>
  );
};
