import React, { useEffect } from "react";
import "./Benefits.css";
import img1 from "./1.png";
import img2 from "./2.png";
import img3 from "./3.png";
import img4 from "./4.jpg";

const Benefits = () => {
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

  // Shuffle images randomly
  const images = [img1, img2, img3, img4];
  images.sort(() => Math.random() - 0.5);

  return (
    <div className="benefits-container">
      <div className="cards">
        <div className="card">
          <img src={images[0]} alt="Expert Mentorship" className="icon" />
          <h3>Expert Mentorship</h3>
          <p>
            Gain insights from industry professionals to enhance your learning
            journey.
          </p>
        </div>
        <div className="card">
          <img
            src={images[1]}
            alt="Networking Opportunities"
            className="icon"
          />
          <h3>Networking Opportunities</h3>
          <p>
            Connect with alumni, industry leaders, and like-minded learners to
            grow your network.
          </p>
        </div>
        <div className="card">
          <img src={images[2]} alt="Real-World Projects" className="icon" />
          <h3>Real-World Projects</h3>
          <p>
            Work on hands-on projects to build practical skills and strengthen
            your portfolio.
          </p>
        </div>
        <div className="card">
          <img src={images[3]} alt="Job & Internship Access" className="icon" />
          <h3>Job & Internship Access</h3>
          <p>
            Explore career opportunities tailored to your skills and
            aspirations.
          </p>
        </div>
      </div>
      <div className="benefits-footer">
        <p className="highlight-text">UNLOCK OPPORTUNITIES</p>
        <h2>
          Empower your learning with <br /> industry-driven benefits
        </h2>
      </div>
    </div>
  );
};

export default Benefits;
