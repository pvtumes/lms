const express = require("express");
const Event = require("../model/Event");

const router = express.Router();

// Register for an event
router.post('/register', async (req, res) => {
    const { name, date, duration, description, userId } = req.body;
  
    try {
      let event = await Event.findOne({ name });
  
      if (!event) {
        event = new Event({ name, date, duration, description, participants: [userId] });
      } else {
        if (!event.participants.includes(userId)) {
          event.participants.push(userId);
        } else {
          return res.status(400).json({ message: 'Already registered for this event' });
        }
      }
  
      await event.save();
      res.status(200).json({ message: 'Successfully registered for the event!' });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });
  


module.exports = router;