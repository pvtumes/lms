const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: String, enum: ["low", "medium", "high"], default: "low" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Announcement", announcementSchema);
