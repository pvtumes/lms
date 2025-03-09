import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import LandingPage from "./landingpage/LandingPage";
import AboutUs from "./pages/Home/AboutUs";
import Login from "./pages/Home/Login";
import SignUp from "./pages/Home/SignUp";
import EnrolledCourses from "./pages/LearnerDashboard/EnrolledCourses";
import Feedbackk from "./pages/LearnerDashboard/Feedbackk";
import CreateEventForm from "./pages/AdminDashboard/CreateEventForm";

import Cd from "./pages/LearnerDashboard/Cd";
import LearnerDashboard from "./pages/LearnerDashboard/LearnerDashboard";
import Assessment from "./pages/LearnerDashboard/Assessment";
import Payment from "./pages/LearnerDashboard/Payment";
import Courses from "./pages/LearnerDashboard/Courses";
import CourseDetailPage from "./pages/LearnerDashboard/CourseDetailPage";
import PaymentSuccessPage from "./pages/LearnerDashboard/PaymentSuccessPage";
import PaymentPage from "./pages/LearnerDashboard/PaymentPage";
import ConfirmPayment from "./pages/LearnerDashboard/ConfirmPayment";
import MentorDashboard from "./pages/MentorDashboard/MentorDashboard";
import Test from "./pages/MentorDashboard/Test";
import Feed from "./pages/MentorDashboard/Feed";
import CourseManagement from "./pages/MentorDashboard/CourseManagement";
import Feedback from "./pages/MentorDashboard/Feedback";

import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import Allstud from "./pages/AdminDashboard/Allstud";
import Allmentor from "./pages/AdminDashboard/Allmentor";
import Announcements from "./pages/AdminDashboard/Announcements";
import Events from "./pages/AdminDashboard/Events";
import Announcement from "./pages/MentorDashboard/Announcement";
import StudentFeedbackForm from "./pages/LearnerDashboard/StudentFeedbackForm";
import { UserProvider } from "./context/UserContext";

import Navbar from "./landingpage/Navbar";
import Features from "./landingpage/Features";
import Benefits from "./landingpage/Benefits";
import Testimonials from "./landingpage/Testimonials";
import ContactForm from "./landingpage/ContactForm";
import Chatbot from "./pages/Home/Chatbot"; // Import the Chatbot component
import AnnouncementPage from "./pages/LearnerDashboard/AnnouncementPage";

const App = () => {
  const [eventss, setEventss] = useState([
    {
      name: "Tech Conference 2023",
      date: "2023-11-15",
      duration: "8 hours",
      description:
        "Annual technology conference featuring keynote speakers and workshops.",
    },
    {
      name: "Music Festival",
      date: "2023-12-01",
      duration: "12 hours",
      description:
        "A day-long music festival with performances from top artists.",
    },
    // Add more events as needed
  ]);

  // Function to add a new event
  const handleAddEvent = (newEvent) => {
    console.log("Adding new event:", newEvent); // Debugging: Log new event
    setEventss([...eventss, newEvent]);
  };

  useEffect(() => {
    console.log("App is mounted");
    console.log("Current events:", eventss); // Debugging: Log current events state
  }, [eventss]); // This will log whenever events change

  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/feedback" element={<StudentFeedbackForm />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/enrolled-courses" element={<EnrolledCourses />} />
          <Route path="/Features" element={<Features />} />
          <Route path="/Benefits" element={<Benefits />} />
          <Route path="/Testimonials" element={<Testimonials />} />
          <Route path="/ContactForm" element={<ContactForm />} />
          <Route path="/announcement" element={<Announcement />} />
          <Route path="/announce" element={<AnnouncementPage />} />
          <Route
            path="/learner-dashboard"
            element={<LearnerDashboard eventss={eventss} />}
          />
          <Route path="/feedbackk" element={<Feedbackk />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/create-announcement" element={<Announcements />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/feed" element={<Feed />} />
          <Route
            path="/course-detail/:courseId"
            element={<CourseDetailPage />}
          />
          <Route path="/payment-success" element={<PaymentSuccessPage />} />
          <Route path="/allstud" element={<Allstud />} />
          <Route path="/allmentor" element={<Allmentor />} />
          <Route path="/confirm-payment" element={<ConfirmPayment />} />
          <Route path="/mentor-dashboard" element={<MentorDashboard />} />
          <Route path="/responses" element={<StudentFeedbackForm />} />
          <Route path="/create-event" element={<CreateEventForm />} />
          <Route path="/test" element={<Test />} />
          <Route path="/mentor-courses" element={<CourseManagement />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/enrolled-courses" element={<EnrolledCourses />} />
          <Route path="/course-detail/:id" element={<Cd />} />
          <Route
            path="/java-assessment"
            element={<Assessment assessmentType="java" />}
          />
          <Route
            path="/sql-assessment"
            element={<Assessment assessmentType="sql" />}
          />
          <Route
            path="/python-assessment"
            element={<Assessment assessmentType="python" />}
          />
          <Route
            path="/react-assessment"
            element={<Assessment assessmentType="react" />}
          />
          <Route
            path="/events"
            element={<Events eventss={eventss} onAddEvent={handleAddEvent} />}
          />
        </Routes>
        {/* Add the Chatbot component here */}
        <Chatbot />
      </Router>
    </UserProvider>
  );
};

export default App;
