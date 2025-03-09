import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Learner"); // Default role
  const [darkMode, setDarkMode] = useState(false); // Light mode enabled by default
  const [error, setError] = useState(""); // State to handle login errors
  const navigate = useNavigate();

  const roles = ["Learner", "Mentor", "Admin"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    // Prepare the login data
    const loginData = {
      email,
      password,
      role,
    };

    try {
      // Send a POST request to the backend
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      // Parse the response
      const data = await response.json();

      if (response.ok) {
        // Login successful
        console.log("Login Successful:", data);

        // Redirect to the respective dashboard based on the selected role
        if (role === "Learner") {
          navigate("/learner-dashboard");
        } else if (role === "Mentor") {
          navigate("/mentor-dashboard");
        } else if (role === "Admin") {
          navigate("/admin-dashboard");
        }
      } else {
        // Login failed
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError("An error occurred. Please try again.");
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`app-container ${darkMode ? "dark-mode" : "light-mode"}`}>
      {/* Dark Mode Toggle Button */}
      <motion.button
        className="dark-mode-toggle"
        onClick={toggleDarkMode}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {darkMode ? "🌙" : "☀️"}
      </motion.button>

      {/* Login Form with Motion Effect */}
      <motion.div
        className="form-container"
        initial={{ opacity: 0, y: -50 }} // Start slightly above
        animate={{ opacity: 1, y: 0 }} // Move to original position
        transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth transition
        whileHover={{ scale: 1.02 }} // Slight scale on hover
        whileTap={{ scale: 0.98 }} // Slight scale on tap
      >
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Select Role</label>
            <div className="role-dropdown-wrapper">
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="role-dropdown"
              >
                {roles.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="form-submit-btn">
            Login
          </button>
        </form>
        <p className="link">
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
