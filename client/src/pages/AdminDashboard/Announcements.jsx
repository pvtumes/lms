import React, { useState } from "react";
import "../../styles/Announcement.css"; // Import the CSS file

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]); // Store all announcements
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    description: "",
    priority: "low", // Default priority
  }); // New announcement data
  const [editingIndex, setEditingIndex] = useState(null); // Track the index of the announcement being edited
  const [editedAnnouncement, setEditedAnnouncement] = useState({
    title: "",
    description: "",
    priority: "low",
  }); // Store the edited announcement data

  // Add a new announcement
  const addAnnouncement = () => {
    fetch("http://localhost:5000/api/announcements", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAnnouncement),
    })
      .then((res) => res.json())
      .then((data) => setAnnouncements([...announcements, data]))
      .catch((err) => console.error(err));
  };

  // Delete an announcement
  const deleteAnnouncement = (index) => {
    const updatedAnnouncements = announcements.filter((_, i) => i !== index);
    setAnnouncements(updatedAnnouncements);
  };

  // Start editing an announcement
  const startEditing = (index) => {
    setEditingIndex(index);
    setEditedAnnouncement(announcements[index]);
  };

  // Save the edited announcement
  const saveEditedAnnouncement = () => {
    if (
      editedAnnouncement.title.trim() !== "" &&
      editedAnnouncement.description.trim() !== ""
    ) {
      const updatedAnnouncements = [...announcements];
      updatedAnnouncements[editingIndex] = editedAnnouncement;
      setAnnouncements(updatedAnnouncements);
      setEditingIndex(null); // Exit editing mode
      setEditedAnnouncement({ title: "", description: "", priority: "low" }); // Clear the edited announcement
    }
  };

  return (
    <div className="admin-announcement-container">
      <h2>Create and Manage Announcements</h2>

      {/* Announcement Input Section */}
      <div className="announcement-input">
        <input
          type="text"
          value={newAnnouncement.title}
          onChange={(e) =>
            setNewAnnouncement({ ...newAnnouncement, title: e.target.value })
          }
          placeholder="Enter announcement title"
        />
        <textarea
          value={newAnnouncement.description}
          onChange={(e) =>
            setNewAnnouncement({
              ...newAnnouncement,
              description: e.target.value,
            })
          }
          placeholder="Enter announcement description"
        />
        <select
          value={newAnnouncement.priority}
          onChange={(e) =>
            setNewAnnouncement({ ...newAnnouncement, priority: e.target.value })
          }
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <button onClick={addAnnouncement}>Add Announcement</button>
      </div>

      {/* Display the list of announcements */}
      <div className="announcements-list">
        <h3>Announcements:</h3>
        {announcements.length === 0 ? (
          <p>No announcements added yet.</p>
        ) : (
          <ul>
            {announcements.map((announcement, index) => (
              <li key={index}>
                {editingIndex === index ? (
                  // Edit mode
                  <>
                    <input
                      type="text"
                      value={editedAnnouncement.title}
                      onChange={(e) =>
                        setEditedAnnouncement({
                          ...editedAnnouncement,
                          title: e.target.value,
                        })
                      }
                      placeholder="Edit announcement title"
                    />
                    <textarea
                      value={editedAnnouncement.description}
                      onChange={(e) =>
                        setEditedAnnouncement({
                          ...editedAnnouncement,
                          description: e.target.value,
                        })
                      }
                      placeholder="Edit announcement description"
                    />
                    <select
                      value={editedAnnouncement.priority}
                      onChange={(e) =>
                        setEditedAnnouncement({
                          ...editedAnnouncement,
                          priority: e.target.value,
                        })
                      }
                    >
                      <option value="low">Low Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="high">High Priority</option>
                    </select>
                    <button onClick={saveEditedAnnouncement}>Save</button>
                  </>
                ) : (
                  // Display mode
                  <>
                    <h4>{announcement.title}</h4>
                    <p>{announcement.description}</p>
                    <p>
                      <strong>Priority:</strong> {announcement.priority}
                    </p>
                    <div className="actions">
                      <button onClick={() => startEditing(index)}>Edit</button>
                      <button onClick={() => deleteAnnouncement(index)}>
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Announcements;
