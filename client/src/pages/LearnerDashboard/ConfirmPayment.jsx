import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import "../../styles/ConfirmPayment.css";

const stripePromise = loadStripe("pk_test_51QyZbySEww0EHVZvDgDxabjxBxB6l3L06RrBxjppjQNMNe1qrtcxDYeh1VzAwRNoRwsn7XRBbSPMgWqdjar9Au4R00y2TCoJhY"); // Replace with your Stripe Publishable Key

const ConfirmPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Read course and userData from route state
  const course = location.state?.course;
  const userData = location.state?.userData;

  const [isProcessing, setIsProcessing] = useState(false);

  // If course is undefined, show an error message
  if (!course) {
    return <p className="error-message">Error: Course data not found!</p>;
  }

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      // Step 1: Create a Payment Intent on the backend
      const response = await fetch("http://localhost:5000/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: course.price }),
      });

      const { clientSecret } = await response.json();
      if (!clientSecret) throw new Error("Failed to create payment intent");

      // Step 2: Confirm the payment using Stripe
      const stripe = await stripePromise;
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement), // Use Stripe's CardElement for card details
          billing_details: {
            name: userData?.name || "Guest",
            email: userData?.email || "guest@example.com",
          },
        },
      });

      if (error) {
        alert(`Payment Failed: ${error.message}`);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        alert("Payment Successful!");
        navigate("/", { state: { paymentSuccess: true, courseId: course.id } });
      }
    } catch (error) {
      alert("Payment Failed! Try again.");
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="confirm-payment-container">
      <div className="payment-box">
        <h2>Confirm Payment</h2>
        <p>Course: {course.title}</p>
        <p>Amount: ₹{course.price}</p>
        <button onClick={handlePayment} className="pay-button" disabled={isProcessing}>
          {isProcessing ? "Processing..." : `Pay ₹${course.price}`}
        </button>
      </div>

      {isProcessing && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Processing Payment...</p>
        </div>
      )}
    </div>
  );
};

export default ConfirmPayment;