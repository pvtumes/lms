import React, { useState } from 'react';

const EventForm = () => {
  const [email, setEmail] = useState('');
  const [eventName, setEventName] = useState('');
  const [participants, setParticipants] = useState(''); // Comma-separated string
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    // Validate participants
    const participantsArray = participants
      .split(',')
      .map((num) => parseInt(num.trim(), 10))
      .filter((num) => !isNaN(num)); // Remove invalid numbers

    if (participantsArray.length === 0) {
      setError('Please enter valid participant numbers (e.g., 1,2,3).');
      return;
    }

    // Prepare data for the backend
    const eventData = {
      email,
      eventName,
      participants: participantsArray,
    };

    try {
      // Send data to the backend
      const response = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error('Failed to save event data.');
      }

      // Reset form and show success message
      setEmail('');
      setEventName('');
      setParticipants('');
      setError('');
      alert('Event data saved successfully!');
    } catch (err) {
      setError(err.message || 'An error occurred while saving the event.');
    }
  };

  return (
    <div className="event-form">
      <h1>Create Event</h1>
      <form onSubmit={handleSubmit}>
        {/* Email Input */}
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Event Name Input */}
        <div className="form-group">
          <label>Event Name:</label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
        </div>

        {/* Participants Input */}
        <div className="form-group">
          <label>Participants (comma-separated numbers):</label>
          <input
            type="text"
            value={participants}
            onChange={(e) => setParticipants(e.target.value)}
            placeholder="e.g., 1,2,3"
            required
          />
        </div>

        {/* Error Message */}
        {error && <p className="error">{error}</p>}

        {/* Submit Button */}
        <button type="submit">Save Event</button>
      </form>
    </div>
  );
};

export default EventForm;