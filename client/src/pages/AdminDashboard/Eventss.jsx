import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import "../../styles/EventsSection.css"; // Make sure to update the correct path

const EventsSection = () => {
  const navigate = useNavigate();

  // State to store events data
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch events when component mounts
  useEffect(() => {
   const fetchEvents = async () => {
     try {
       const response = await fetch("http://localhost:5000/api/event");
       if (response.ok) {
         const data = await response.json();
         setEvents(data);
       } else {
         throw new Error("Failed to fetch events");
       }
     } catch (error) {
       console.error("Error fetching events:", error);
       setError("Error fetching events.");
     } finally {
       setLoading(false);
     }
   };


    fetchEvents();
  }, []);

  return (
    <div className="events-section">
      <h1>Upcoming Events</h1>
      <p>Manage and view upcoming events here.</p>

      {/* Button to navigate to event creation form */}
      <button className="add-button" onClick={() => navigate("/create-event")}>
        <Plus size={16} /> Create Event
      </button>

      {/* Show loading indicator while events are being fetched */}
      {loading && <p>Loading events...</p>}

      {/* Show error message if fetching failed */}
      {error && <p>{error}</p>}

      {/* Show events if available */}
      <div className="events-list">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event.id} className="event-card">
              <h3>{event.eventName}</h3>
              <p>{event.description}</p>
              <p>
                <strong>Date:</strong> {event.date} <strong>Time:</strong>{" "}
                {event.time}
              </p>
              <p>
                <strong>Location:</strong> {event.location}
              </p>
              <p>
                <strong>Max Participants:</strong> {event.maxParticipants}
              </p>
              <p>
                <strong>Prize:</strong> {event.prize || "N/A"}
              </p>
            </div>
          ))
        ) : (
          <p>No events found</p>
        )}
      </div>
    </div>
  );
};

export default EventsSection;
