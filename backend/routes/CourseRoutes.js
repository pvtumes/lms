const express = require("express");
const {
  getCourses,
  addCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/CourseController");

const router = express.Router();

router.get("/", getCourses);
router.post("/", addCourse);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

module.exports = router;
