const Event = require("../model/EventCreation");

// Create a new event
const createEvent = async (req, res) => {
  try {
    const {
      eventName,
      description,
      date,
      time,
      location,
      maxParticipants,
      prize,
    } = req.body;

    // Validate input
    if (
      !eventName ||
      !description ||
      !date ||
      !time ||
      !location ||
      !maxParticipants
    ) {
      return res
        .status(400)
        .json({ error: "All fields are required except prize" });
    }

    // Create event
    const newEvent = new Event({
      eventName,
      description,
      date,
      time,
      location,
      maxParticipants,
      prize,
    });

    // Save the event to the database
    await newEvent.save();
    return res
      .status(201)
      .json({ message: "Event created successfully", event: newEvent });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create event" });
  }
};

// Get all events (Optional: To display the events on a dashboard or list)
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    return res.status(200).json(events);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch events" });
  }
};

module.exports = { createEvent, getAllEvents };
