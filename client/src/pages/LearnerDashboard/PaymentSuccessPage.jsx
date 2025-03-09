import React from 'react';
import { useLocation } from 'react-router-dom';

const PaymentSuccessPage = () => {
  const location = useLocation();
  const { course, userDetails, paymentMethod, upiId } = location.state;

  return (
    <div className="success-container">
      <h1>Payment Successful!</h1>
      <p>Thank you, {userDetails.fullName}, for purchasing {course.title}.</p>
      <p>Payment Method: {paymentMethod}</p>
      {paymentMethod === 'UPI' && <p>UPI ID: {upiId}</p>}
    </div>
  );
};

export default PaymentSuccessPage;