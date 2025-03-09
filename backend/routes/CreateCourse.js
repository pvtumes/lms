require("dotenv").config();
const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const Course = require("../model/CourseCreation");

const router = express.Router();

// ✅ Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// ✅ Multer Storage for Video & Thumbnail
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const folder = "courses";
    return {
      folder,
      resource_type: file.mimetype.startsWith("video") ? "video" : "image"
    };
  }
}); 

const upload = multer({ storage });

router.post(
  "/create",
  upload.fields([{ name: "video" }, { name: "thumbnail" }]),
  async (req, res) => {
    try {
      const { title, description, tags, price, duration, isFree } = req.body;
      
      if (!req.files || !req.files.video || !req.files.thumbnail) {
        return res.status(400).json({ error: "Video and Thumbnail required" });
      }

      const videoUrl = req.files.video[0].path;
      const thumbnailUrl = req.files.thumbnail[0].path;

      const course = new Course({
        title,
        description,
        tags: tags ? tags.split(",") : [], // Ensure tags are handled as an array
        price: parseFloat(price),
        duration,
        isFree: isFree === "true", // Convert isFree to Boolean
        thumbnail: thumbnailUrl,
        videoUrl, // Include videoUrl field for reference
        enrollmentCount: 0, // Default as new course
        rating: 0 // Default as new course
      });

      await course.save();

      res.status(201).json({ message: "Course created successfully!", course });

    } catch (error) {
      console.error("❌ Error creating course:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
);


router.get("/recommend-courses", async (req, res) => {
  try {
      const popularCourses = await Course.find().sort({ enrollmentCount: -1 }).limit(3);
      const trendingCourses = await Course.find().sort({ rating: -1 }).limit(3);
      const newCourses = await Course.find().sort({ createdAt: -1 }).limit(3);
      const randomCourses = await Course.aggregate([{ $sample: { size: 3 } }]);

      res.json({
          popularCourses,
          trendingCourses,
          newCourses,
          randomCourses
      });

  } catch (error) {
      console.error("❌ Error fetching recommendations:", error);
      res.status(500).json({ error: "Failed to fetch course recommendations." });
  }
});

module.exports = router;
