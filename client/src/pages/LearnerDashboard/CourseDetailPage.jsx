import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../../styles/CourseDetailPage.css';

const CourseDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { course } = location.state;

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    mobile: '',
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userData.name || !userData.email || !userData.mobile) {
      alert('Please fill in all fields!');
      return;
    }

    navigate('/payment', { state: { course, userData } });
  };

  return (
    <div className="course-detail-container">
      <motion.div 
        className="course-detail-card"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Enroll in {course.title}</h2>
        <form onSubmit={handleSubmit} className="detail-form">
          <label>Name:</label>
          <input type="text" name="name" value={userData.name} onChange={handleChange} required />
          
          <label>Email:</label>
          <input type="email" name="email" value={userData.email} onChange={handleChange} required />
          
          <label>Mobile No:</label>
          <input type="tel" name="mobile" value={userData.mobile} onChange={handleChange} required />

          <motion.button 
            type="submit" 
            className="submit-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Proceed to Payment
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default CourseDetail;
