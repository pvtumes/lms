const Announcement = require("../model/Announcements");

// Create Announcement
exports.createAnnouncement = async (req, res) => {
  try {
    const { title, description, priority } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const announcement = await Announcement.create({
      title,
      description,
      priority,
    });
    res.status(201).json(announcement);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get All Announcements
exports.getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.status(200).json(announcements);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update Announcement
exports.updateAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAnnouncement = await Announcement.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!updatedAnnouncement) {
      return res.status(404).json({ message: "Announcement not found" });
    }
    res.status(200).json(updatedAnnouncement);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete Announcement
exports.deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAnnouncement = await Announcement.findByIdAndDelete(id);
    if (!deletedAnnouncement) {
      return res.status(404).json({ message: "Announcement not found" });
    }
    res.status(200).json({ message: "Announcement deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
