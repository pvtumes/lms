const jwt = require("jsonwebtoken");
require("dotenv").config();

// ✅ Verify Mentor Role
const verifyMentor = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ error: "Access Denied" });

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;

    if (req.user.role !== "Mentor") {
      return res.status(403).json({ error: "Only mentors can upload assessments" });
    }

    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid Token" });
  }
}; 

const ensureAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
};

const checkRole = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return res.status(403).json({ error: "Forbidden: You don't have permission" });
  }
  next();
};


module.exports = { verifyMentor ,ensureAuth, checkRole};
