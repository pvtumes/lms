import React from "react";
import "./Home.css"; // Import the CSS file
import Image1 from "./left.png"; // Replace with your image paths
import Image2 from "./right.png"; // Replace with your image paths
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Home = () => {
  return (
    <div className="hero-container">
      {/* First Div: Image */}
      <div className="image-container">
        <img src={Image1} alt="Decorative" className="hero-image" />
      </div>

      {/* Middle Div: Content */}
      <div className="content-container">
        <h1 className="H1tag">LEARN CONNECT GROW</h1>
        <h2>
          Empowering Learners.<br></br>{" "}
          <span className="automated">Seamlessly</span>.
        </h2>

        <p>
          Connect with industry experts, enhance your skills, and unlock new
          opportunities. Experience AI-powered learning with seamless job and
          internship integration.
        </p>
        <div className="buttons-container">
          <Link to="/signup">
            <button className="primary-button">Get Started</button>
          </Link>
          <Link to="/about">
            <button className="secondary-button">Learn More</button>
          </Link>
        </div>
      </div>

      {/* Last Div: Image */}
      <div className="image-container">
        <img src={Image2} alt="Decorative" className="hero-image" />
      </div>
    </div>
  );
};

export default Home;
