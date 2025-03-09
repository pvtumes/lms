import React, { useEffect } from "react";
import "./Features.css";
import img1 from "./1.png";
import img2 from "./2.png";
import img3 from "./3.png";
import img4 from "./4.jpg";

const Features = () => {
  useEffect(() => {
    const handleScroll = () => {
      const cards = document.querySelectorAll(".card");
      cards.forEach((card) => {
        const cardPosition = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (cardPosition < windowHeight - 50) {
          card.classList.add("show");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger when page loads

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="efficence-container">
      <div className="cards">
        <div className="card">
          <img src={img4} alt="Personalized Learning" className="icon" />
          <h3>Personalized Learning</h3>
          <p>
            Connectify tailors content to your learning needs, helping you stay
            ahead in your career.
          </p>
        </div>
        <div className="card">
          <img src={img1} alt="Seamless Collaboration" className="icon" />
          <h3>Seamless Collaboration</h3>
          <p>
            Engage with peers, mentors, and industry experts to enhance your
            learning experience.
          </p>
        </div>
        <div className="card">
          <img src={img2} alt="Skill Development" className="icon" />
          <h3>Skill Development</h3>
          <p>
            Build in-demand skills with real-world projects and hands-on coding
            challenges.
          </p>
        </div>
        <div className="card">
          <img src={img3} alt="Career Growth" className="icon" />
          <h3>Career Growth</h3>
          <p>
            Access job and internship opportunities tailored to your expertise
            and interests.
          </p>
        </div>
      </div>
      <div className="efficence-footer">
        <p className="highlight-text">ACCELERATE YOUR LEARNING</p>
        <h2>
          Unlock your potential with AI-powered <br /> personalized learning
        </h2>
      </div>
    </div>
  );
};

export default Features;
