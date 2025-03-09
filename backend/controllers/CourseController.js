const Course = require("../model/CourseCreation");

// Get all courses
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses", error });
  }
};

// Add a new course
exports.addCourse = async (req, res) => {
  try {
    const { title, price, teacher, domain } = req.body;

    if (!title || !teacher || !domain) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newCourse = new Course({ title, price: "Free", teacher, domain });
    await newCourse.save();

    res.status(201).json({ message: "Course added successfully", newCourse });
  } catch (error) {
    res.status(500).json({ message: "Error adding course", error });
  }
};

// Update a course
exports.updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, teacher, domain } = req.body;

    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      { title, price: "Free", teacher, domain },
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ message: "Course updated", updatedCourse });
  } catch (error) {
    res.status(500).json({ message: "Error updating course", error });
  }
};

// Delete a course
exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ message: "Course deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting course", error });
  }
};
