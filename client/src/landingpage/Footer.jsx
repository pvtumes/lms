import React from "react";
import "./Footer.css";
import { FaTwitter, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section - Logo & Description */}
        <div className="footer-section footer-logo">
          <h2>Connectify</h2>
          <p>Empowering connections, enhancing careers.</p>
        </div>

        {/* Middle Section - Navigation Links */}
        <div className="footer-section footer-nav">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="/features">Features</a>
            </li>
            <li>
              <a href="/benefits">Benefits</a>
            </li>
            <li>
              <a href="/testimonials">Testimonials</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
            <li>
              <a href="/privacy-policy">Privacy Policy</a>
            </li>
            <li>
              <a href="/terms-of-service">Terms of Service</a>
            </li>
          </ul>
        </div>

        {/* Right Section - Contact Info */}
        <div className="footer-section footer-contact">
          <h3>Contact Us</h3>
          <p>📍 123 Tech Street, Innovation City, USA</p>
          <p>
            📧{" "}
            <a href="mailto:support@connectify.com">support@connectify.com</a>
          </p>
          <p>📞 +1 (234) 567-8900</p>
        </div>
      </div>

      {/* Bottom Section - Social Media & Copyright */}
      <div className="footer-bottom">
        <div className="footer-socials">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
        </div>
        <p>
          © {new Date().getFullYear()}{" "}
          <a
            href="https://connectify.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Connectify
          </a>
          . All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
