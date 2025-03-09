import React from "react";
import "./ContactForm.css";

const ContactForm = () => {
  return (
    <div className="contact-form-container">
      <div className="contact-form-box">
        <h2 className="contact-form-heading">Contact Us</h2>

        <form className="contact-form">
          {/* First Row - Name & Email */}
          <div className="contact-form-row">
            <input
              type="text"
              placeholder="Name"
              className="contact-form-input"
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="contact-form-input"
              required
            />
          </div>

          {/* Second Row - Phone Number */}
          <input
            type="tel"
            placeholder="Phone Number"
            className="contact-form-input"
            required
          />

          {/* Third Row - Message */}
          <textarea
            placeholder="Your Message..."
            className="contact-form-textarea"
            required
          ></textarea>

          {/* Submit Button */}
          <button type="submit" className="contact-form-button">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
