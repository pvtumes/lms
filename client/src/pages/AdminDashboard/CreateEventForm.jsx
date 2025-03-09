import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Award,
  Plus,
  Book,
} from "lucide-react";
import "../../styles/CreateEventForm.css"; // Import your CSS file

const CreateEventForm = () => {
  const navigate = useNavigate();

  // State to manage form inputs
  const [eventData, setEventData] = useState({
    eventName: "",
    description: "",
    date: "",
    time: "",
    location: "",
    maxParticipants: "",
    prize: "",
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        console.log("Event Created:", eventData);
        alert("Event created successfully!");
        navigate("/admin-dashboard"); // Redirect to the home page
      } else {
        alert("Failed to create event. Please try again.");
      }
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Error occurred while creating the event.");
    }
  };

  return (
    <div className="create-event-page">
      <div className="create-event-form">
        <h1>Create Upcoming Event</h1>
        <form onSubmit={handleSubmit}>
          {/* Event Name */}
          <div className="form-group">
            <label htmlFor="eventName">
              <Award size={16} /> Event Name
            </label>
            <input
              type="text"
              id="eventName"
              name="eventName"
              value={eventData.eventName}
              onChange={handleInputChange}
              placeholder="Enter event name"
              required
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="description">
              <Book size={16} /> Description
            </label>
            <textarea
              id="description"
              name="description"
              value={eventData.description}
              onChange={handleInputChange}
              placeholder="Enter event description"
              rows="4"
              required
            />
          </div>

          {/* Date and Time */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">
                <Calendar size={16} /> Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={eventData.date}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="time">
                <Clock size={16} /> Time
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={eventData.time}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* Location */}
          <div className="form-group">
            <label htmlFor="location">
              <MapPin size={16} /> Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={eventData.location}
              onChange={handleInputChange}
              placeholder="Enter event location"
              required
            />
          </div>

          {/* Max Participants */}
          <div className="form-group">
            <label htmlFor="maxParticipants">
              <Users size={16} /> Max Participants
            </label>
            <input
              type="number"
              id="maxParticipants"
              name="maxParticipants"
              value={eventData.maxParticipants}
              onChange={handleInputChange}
              placeholder="Enter maximum participants"
              min="1"
              required
            />
          </div>

          {/* Prize */}
          <div className="form-group">
            <label htmlFor="prize">
              <Award size={16} /> Prize
            </label>
            <input
              type="text"
              id="prize"
              name="prize"
              value={eventData.prize}
              onChange={handleInputChange}
              placeholder="Enter prize details"
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-button">
            <Plus size={16} /> Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEventForm;
