import React, { useState } from "react";
import axios from "axios"; // For making HTTP requests
import "./Chatbot.css";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you?", sender: "bot" },
  ]); // Initial message from the bot
  const [inputText, setInputText] = useState("");

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async () => {
    const trimmedInput = inputText.trim();

    if (trimmedInput === "") {
      // Display a message to the user if the input is empty
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Please enter a message.", sender: "bot" },
      ]);
      return;
    }

    // Add user message to the chat
    setMessages([...messages, { text: trimmedInput, sender: "user" }]);

    // Clear input
    setInputText("");

    try {
      // Send the user's message to the backend chatbot API
      const response = await axios.post("http://localhost:5000/chat", {
        query: trimmedInput,
      });

      // Check if the response has a 'reply' field and update messages
      if (response.data && response.data.reply) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: response.data.reply, sender: "bot" }, // Use 'reply' from the server
        ]);
      } else {
        // Fallback in case the response does not contain the expected 'reply' field
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: "Sorry, I couldn't understand your request.",
            sender: "bot",
          },
        ]);
      }
    } catch (error) {
      console.error("Error communicating with the chatbot API:", error);

      // Add an error message if the API call fails
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: "Sorry, I'm unable to respond at the moment.",
          sender: "bot",
        },
      ]);
    }
  };

  return (
    <>
      {/* Chatbot Icon */}
      <div className="chatbot-icon" onClick={toggleChatbot}>
        💬
      </div>

      {/* Chatbot Container */}
      <div className={`chatbot-container ${isOpen ? "open" : ""}`}>
        <div className="chatbot-header">Chatbot</div>
        <div className="chatbot-body">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${
                message.sender === "user" ? "user-message" : "bot-message"
              }`}
            >
              {message.text}
            </div>
          ))}
        </div>
        <div className="chatbot-footer">
          <input
            type="text"
            placeholder="Type a message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
