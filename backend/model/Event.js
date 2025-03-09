const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  duration: { type: String, required: true },
  description: { type: String, required: true },
  participants: [{ type: String }], // List of user IDs
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
