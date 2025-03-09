const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// 🔹 Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// 🔹 Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "assessments",
    resource_type: "auto"
  }
});

const upload = multer({ storage });

module.exports = upload;
