import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../../styles/PaymentPage.css';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { course, userData } = location.state;

  const handleConfirm = () => {
    navigate('/confirm-payment', { state: { course, userData } });
  };

  return (
    <div className="payment-container">
      <motion.div 
        className="payment-card"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="payment-title">Confirm Your Payment</h2>

        <div className="payment-info">
          <p><strong>Course:</strong> {course.title}</p>
          <p><strong>Price:</strong> ₹{course.price}</p>
          <p><strong>Instructor:</strong> {course.teacher || 'Not Available'}</p>
        </div>

        <motion.button 
          onClick={handleConfirm} 
          className="confirm-button"
          whileHover={{ scale: 1.05, backgroundColor: "#0056b3" }}
          whileTap={{ scale: 0.95 }}
        >
          Proceed to Payment
        </motion.button>
      </motion.div>
    </div>
  );
};

export default PaymentPage;
