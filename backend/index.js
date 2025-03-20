const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoute");
const axios = require("axios");

const eventRoutes = require("./routes/EventRoutes");
const scoreRoutes = require("./routes/ScoreRoute");
const announcementRoutes = require("./routes/Announcement");
const courseRoutes = require("./routes/CourseRoutes");
const feedbackRoutes = require("./routes/FeedBack");
const eventRoute = require("./routes/EventRoute");

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

const assessmentRoutes = require("./routes/Assessment");
const Admin = require("./model/Admin");

mongoose
  .connect("mongodb+srv://Atharva:Atharva%402004@cluster0.pru0w.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", Admin);
app.use("/api/assessments", assessmentRoutes);
app.use("/api", eventRoute);
app.use("/api/courses", courseRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api", scoreRoutes);
app.use("/event", eventRoutes);
app.use("/api/announcements", announcementRoutes);

// Stripe Checkout session route
app.post("/create-checkout-session", async (req, res) => {
  const { course } = req.body;

  if (!course || !course.title) {
    return res.status(400).json({ error: "Course title is required" });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: { name: course.title },
            unit_amount: 1000, // Example fixed price (₹10.00)
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error("❌ Stripe Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Cohere API route for chat functionality
const COHERE_API_KEY = process.env.COHERE_API_KEY;
app.post("/chat", async (req, res) => {
  const { query } = req.body;

  try {
    const response = await axios.post(
      "https://api.cohere.ai/v1/generate",
      {
        model: "command",
        prompt: query,
        max_tokens: 300,
      },
      {
        headers: {
          Authorization: `Bearer ${COHERE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ reply: response.data.generations[0].text.trim() });
  } catch (error) {
    console.error(
      "❌ Cohere API Error:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Failed to connect to Cohere API" });
  }
});

// Set the port and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
