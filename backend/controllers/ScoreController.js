const Score = require("../model/Score");

// Save score
exports.saveScore = async (req, res) => {
  const { email, assessmentType, score } = req.body;

  try {
    // Save the score data to the database
    const newScore = new Score({ email, assessmentType, score });
    await newScore.save();

    res.status(200).json({ message: "Score saved successfully!" });
  } catch (error) {
    console.error("Error saving score:", error);
    res.status(500).json({ message: "Failed to save score" });
  }
};
