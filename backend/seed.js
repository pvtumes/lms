const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://Atharva:Atharva%402004@cluster0.pru0w.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Define the Course schema
const courseSchema = new mongoose.Schema({
  title: String,
  price: String,
  teacher: String,
  domain: String,
});

const Course = mongoose.model("Course", courseSchema);

// Predefined list of courses, teachers, and domains
const courseTitles = [
  "Java Fundamentals",
  "Python for Beginners",
  "Data Structures in C",
  "Web Development Bootcamp",
  "Machine Learning Basics",
  "Cloud Computing Essentials",
  "Database Management Systems",
  "React Mastery",
  "Node.js Crash Course",
  "DevOps Essentials",
];

const teachers = [
  "John Doe",
  "Alice Johnson",
  "Michael Brown",
  "Sarah Lee",
  "Raj Kumar",
  "Umesh Prasad",
  "Sujata Sharma",
  "Ram Iyer",
  "Priya Verma",
  "Rahul Singh",
];

const domains = [
  "Programming",
  "Web Development",
  "Machine Learning",
  "Cloud Computing",
  "Database",
  "Software Engineering",
];

// Generate random course data
const generateRandomCourses = (num) => {
  const courses = [];
  for (let i = 0; i < num; i++) {
    const randomTitle = courseTitles[i % courseTitles.length];
    const randomTeacher = teachers[Math.floor(Math.random() * teachers.length)];
    const randomDomain = domains[Math.floor(Math.random() * domains.length)];

    // Randomly decide if the course is free or paid
    const isFree = Math.random() > 0.5; // 50% chance to be free

    const price = isFree ? "Free" : `Rs ${Math.floor(Math.random() * 1000)}`;

    courses.push({
      title: randomTitle,
      price: price,
      teacher: randomTeacher,
      domain: randomDomain,
    });
  }
  return courses;
};

// Insert the data into MongoDB
const seedDatabase = async () => {
  try {
    await Course.deleteMany({}); // Clear previous data if needed
    const courses = generateRandomCourses(20); // Insert 20 random courses
    await Course.insertMany(courses);
    console.log("Course data inserted successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error inserting data:", error);
  }
};

seedDatabase();
