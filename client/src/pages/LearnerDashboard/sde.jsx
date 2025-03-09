import React, { useState } from "react";
import RegistrationPage from "./Event_registration";

const StudentsEventData = ({ eventss }) => {
  const [showRegistration, setShowRegistration] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registeredEvents, setRegisteredEvents] = useState([]);

  const isRegistered = (eventName) => {
    return registeredEvents.includes(eventName);
  };

  const handleRegisterClick = async (event) => {
    const userEmail = "user@example.com"; // Replace with dynamic email from your auth system

    if (isRegistered(event.name)) {
      alert("You are already registered for this event.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/event/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: event.name,
          date: event.date,
          duration: event.duration,
          description: event.description,
          email: userEmail,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setRegisteredEvents([...registeredEvents, event.name]); // Add event to registered list
        alert("Successfully registered for the event!");
      } else {
        alert(data.message || "Registration failed.");
      }
    } catch (error) {
      alert("Error registering for the event. Please try again.");
    }
  };

  const containerStyle = {
    padding: "40px",
    textAlign: "center",
  };

  const titleStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  };

  const eventsGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
    justifyContent: "center",
  };

  const eventCardStyle = {
    background: "#e0f7fa",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s, box-shadow 0.3s",
  };

  const hoverEffect = {
    transform: "translateY(-5px)",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
  };

  const eventTitleStyle = {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
  };

  const eventInfoStyle = {
    fontSize: "14px",
    color: "#555",
    margin: "5px 0",
  };

  const buttonStyle = {
    marginTop: "10px",
    padding: "8px 15px",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
  };

  const noEventsStyle = {
    fontSize: "16px",
    color: "gray",
  };

  return (
    <div style={containerStyle}>
      {showRegistration ? (
        <RegistrationPage event={selectedEvent} />
      ) : (
        <>
          <h2 style={titleStyle}>📅 Upcoming Events</h2>
          <div style={eventsGridStyle}>
            {eventss.length > 0 ? (
              eventss.map((event, index) => (
                <div
                  key={index}
                  style={{
                    ...eventCardStyle,
                    ":hover": hoverEffect,
                  }}
                >
                  <h3 style={eventTitleStyle}>{event.name}</h3>
                  <p style={eventInfoStyle}>📆 {event.date}</p>
                  <p style={eventInfoStyle}>⏳ Duration: {event.duration}</p>
                  <p style={eventInfoStyle}>{event.description}</p>
                  <button
                    style={buttonStyle}
                    onClick={() => handleRegisterClick(event)}
                    disabled={isRegistered(event.name)}
                  >
                    {isRegistered(event.name) ? "Already Registered" : "Register Now"}
                  </button>
                </div>
              ))
            ) : (
              <p style={noEventsStyle}>No upcoming events</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default StudentsEventData;