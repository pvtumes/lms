const User = require("../model/SignUp");
const jwt = require("jsonwebtoken");
const bcrypt  = require("bcrypt") ; 

exports.signup = async (req, res) => {
  try {
    const {  email, password, role } = req.body;

    // Validate role
    if (!["Learner", "Mentor", "Admin"].includes(role)) {
      return res.status(400).json({ error: "Invalid role provided." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const newUser = new User({  email, password, role });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};
exports.login = async (req, res) => {
    try {
      const { email, password, role } = req.body;
  
      // Find user by email and role
      const user = await User.findOne({ email, role });
      if (!user) {
        return res.status(400).json({ error: "Invalid email or role" });
      }
  
      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid password" });
      }
  
      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        "your_jwt_secret",
        { expiresIn: "1h" }
      );
  
      res.json({ message: "Login successful", token, role: user.role });
    } catch (error) {
      res.status(500).json({ error: "Server Error", details: error.message });
    }
  };