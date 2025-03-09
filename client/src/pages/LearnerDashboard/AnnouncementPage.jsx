import React, { useEffect, useState } from "react";
import "./AnnouncementPage.css"; // Import the CSS file

const AnnouncementsPage = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/announcements")
      .then((res) => res.json())
      .then((data) => setAnnouncements(data))
      .catch((err) => console.error("Error fetching announcements:", err));
  }, []);

  return (
    <div className="announcements-container">
      <h2 style={{color:"white"}}>Latest Announcements</h2>
      {announcements.length === 0 ? (
        <p className="no-announcements">No announcements available.</p>
      ) : (
        <div className="announcements-list">
          {announcements.map((announcement, index) => (
            <div
              key={index}
              className={`announcement-card ${announcement.priority}`}
            >
              <h3>{announcement.title}</h3>
              <p>{announcement.description}</p>
              <span className="priority">
                Priority: {announcement.priority}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnnouncementsPage;
