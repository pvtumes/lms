import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import "../../styles/AboutUs.css";

const teamMembers = [
  {
    name: "Srushti Chopade",
    role: "Frontend Developer",
    image: "https://i.pinimg.com/736x/4c/30/b9/4c30b9de7fe46ffb20d4ee4229509541.jpg",
    linkedin: "#",
    github: "#"
  },
  {
    name: "Pranali Gulhane",
    role: "Frontend Developer",
    image: "https://i.pinimg.com/736x/4c/30/b9/4c30b9de7fe46ffb20d4ee4229509541.jpg",
    linkedin: "#",
    github: "#"
  },
  {
    name: "Atharva Anbhule",
    role: "Backend Developer",
    image: "https://static.vecteezy.com/system/resources/previews/014/194/222/non_2x/avatar-icon-human-a-person-s-badge-social-media-profile-symbol-the-symbol-of-a-person-vector.jpg",
    linkedin: "#",
    github: "#"
  },
  {
    name: "Umesh Prasad",
    role: "Backend Designer",
    image: "https://static.vecteezy.com/system/resources/previews/014/194/222/non_2x/avatar-icon-human-a-person-s-badge-social-media-profile-symbol-the-symbol-of-a-person-vector.jpg",
    linkedin: "#",
    github: "#"
  }
];

const AboutUs = () => {
  const navigate = useNavigate(); // Hook for navigation

  // Function to handle back to home
  const handleBackToHome = () => {
    navigate('/'); // Navigate to the home page
  };

  return (
    <div className="about-us-container">
      {/* Back to Home Button */}
      <button className="back-to-home-btn" onClick={handleBackToHome}>
        ← Back to Home
      </button>

      <h2 className="section-title">Meet Our Exceptional Team</h2>
      
      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-card">
            <div className="team-card-image">
              <img src={member.image} alt={member.name} />
              <div className="image-overlay">
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            </div>
            
            <div className="team-card-content">
              <div className="social-links">
                <a href={member.linkedin} className="social-link" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href={member.github} className="social-link" target="_blank" rel="noopener noreferrer">GitHub</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;