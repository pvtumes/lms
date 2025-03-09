const express = require("express");
const router = express.Router();
const { createEvent, getAllEvents } = require("../controllers/EventCreation");

// Route to create a new event
router.post("/events", createEvent);

// Route to get all events (Optional, if you want to display them somewhere)
router.get("/event", getAllEvents);

module.exports = router;
