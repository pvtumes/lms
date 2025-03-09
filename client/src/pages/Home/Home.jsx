import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/Home.css";
import Chatbot from "./Chatbot";

const Home = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const featuresRef = useRef(null);
  const testimonialRef = useRef(null);
  const benefitsRef = useRef(null);
  const navigate = useNavigate();

  // Scroll event listener for Back to Top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (elementRef) => {
    elementRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Back button handler
  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const features = [
    {
      icon: "🌐",
      title: "Global Connectivity",
      description: "Connect with experts globally, overcoming geographical limits.",
      color: "#3498db"
    },
    {
      icon: "🤝",
      title: "Seamless Networking",
      description: "Effortlessly build and manage your professional network.",
      color: "#2ecc71"
    },
    {
      icon: "📊",
      title: "Seamless & Secure Transactions",
      description: "Ensures smooth transactions with a reliable payment gateway.",
      color: "#e74c3c"
    }
  ];

  const benefits = [
    {
      icon: "🚀",
      title: "Career Acceleration",
      description: "Unlock new career opportunities through strategic networking."
    },
    {
      icon: "💡",
      title: "Knowledge Sharing",
      description: "Learn from industry experts and peers across various domains."
    },
    {
      icon: "🌟",
      title: "Flexibility",
      description: "Enables learning anytime, anywhere."
    }
  ];

  const testimonials = [
    {
     
      role: "Efficient and user-friendly",
      quote: "Connectify transformed how I network and find opportunities!",
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      
      role: "Helps me stay organized",
      quote: "The most intuitive professional networking platform I've used.",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    }
  ];

  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo-container">
          <button 
            className="back-button" 
            onClick={handleGoBack}
            style={{ 
              border: 'none', 
              background: 'none', 
              cursor: 'pointer', 
              color: '#000', 
              fontSize: '16px',
              textDecoration: 'none',
              transition: 'color 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.color = '#3498db'} // Change color on hover
            onMouseLeave={(e) => e.target.style.color = '#000'} // Revert color on hover out
          >
            &#8592; Back
          </button>
          <h1 className="logo">
            <br />Connectify
          </h1>
        </div>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#features" onClick={() => scrollToSection(featuresRef)}>Features</a></li>
          <li><a href="#benefits" onClick={() => scrollToSection(benefitsRef)}>Benefits</a></li>
          <li><a href="#testimonials" onClick={() => scrollToSection(testimonialRef)}>Testimonials</a></li>
          <li><a href="#contact">Contact</a></li>
          <li className="auth-links">
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/signup" className="nav-link">Signup</Link>
          </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="hero-section" id="home">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Connect. Grow. Succeed.</h1>
          <p>Your Professional Network, Reimagined</p>
          <div className="hero-cta">
            <Link to="/signup" className="primary-btn">Get Started</Link>
            <Link to="/about" className="secondary-btn">Learn More</Link>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="features-section" id="features">
        <h2>Why Choose Connectify?</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="feature-card"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div 
                className="feature-icon" 
                style={{ backgroundColor: feature.color, color: 'white' }}
              >
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section ref={benefitsRef} className="benefits-section" id="benefits">
        <h2>Professional Growth Awaits</h2>
        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <motion.div 
              key={index} 
              className="benefit-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="benefit-icon">{benefit.icon}</div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialRef} className="testimonials-section" id="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonial-grid">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index} 
              className="testimonial-card"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img src={testimonial.image} alt={testimonial.name} className="testimonial-image" />
              <blockquote>"{testimonial.quote}"</blockquote>
              <div className="testimonial-info">
                <h4>{testimonial.name}</h4>
                <p>{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-section" id="contact">
        <p>Contact Us</p>
        <h2>Get In Touch!</h2>
        <form className="contact-form">
          <div className="form-row">
            <input type="text" id="name" name="name" placeholder="Your Name" required />
            <input type="email" id="email" name="email" placeholder="Your Email" required />
          </div>
          <input type="text" id="subject" name="subject" placeholder="Subject" required />
          <textarea id="message" name="message" rows="5" placeholder="Message" required></textarea>
          <button type="submit" className="send-message-btn">Send Message</button>
        </form>
      </section>

      {/* Back to Top Button */}
      {showBackToTop && (
        <motion.button
          className="back-to-top"
          onClick={scrollToTop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ↑
        </motion.button>
      )}


      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Connectify</h3>
            <p>Your Professional Network Companion</p>
            <div className="social-icons">
              <a href="#" className="social-icon">Facebook</a>
              <a href="#" className="social-icon">Twitter</a>
              <a href="#" className="social-icon">LinkedIn</a>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/features">Features</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Support</h4>
            <ul>
              <li><Link to="/help">Help Center</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Newsletter</h4>
            <p>Stay updated with our latest news and updates</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Enter your email" required />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 Connectify. All Rights Reserved.</p>
          <div className="footer-legal">
            <Link to="/terms">Terms of Service</Link>
            <Link to="/privacy">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;