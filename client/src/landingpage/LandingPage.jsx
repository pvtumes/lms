import Benefits from "./Benefits";
import Features from "./Features";
import ContactForm from "./ContactForm";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Testimonials from "./Testimonials";
import Home from "./Home";
import "./LandingPage.css";

function LandingPage() {
  return (
    <>
      <Navbar />
      <div id="home">
        <Home />
      </div>
      <div id="features">
        <Features />
      </div>
      <div id="benefits">
        <Benefits />
      </div>
      <div id="testimonials">
        <Testimonials />
      </div>
      <div id="contact">
        <ContactForm />
      </div>
      <Footer />
    </>
  );
}

export default LandingPage;
