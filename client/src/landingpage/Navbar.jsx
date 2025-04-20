import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Logo from "./Logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo - Left Side */}
        <div className="logo">
          <img src={Logo} alt="Logo" />
          <span className="title">Learning Management System</span>
        </div>

        {/* Navigation Links - Centered */}
        <div className="nav-links">
          <Link to="/features" className="nav-item">
            Features
          </Link>
          <Link to="/benefits" className="nav-item">
            Benefits
          </Link>
          <Link to="/testimonials" className="nav-item">
            Testimonials
          </Link>
          <Link to="/contact" className="nav-item">
            Contact
          </Link>
        </div>

        {/* Login & Signup Buttons - Right Side */}
        <div className="nav-buttons">
          <Link to="/login" className="nav-button">
            Login
          </Link>
          <Link to="/signup" className="nav-button">
            Signup
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
