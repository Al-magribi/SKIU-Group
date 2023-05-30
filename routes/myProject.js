const express = require("express");
const { authenticateToken } = require("../handler/auth&authorize");
const router = express.Router();
const Project = require("../models/Project");

// USER PROJECT => /api/user/myproject
router.get("/myproject", authenticateToken, async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.id });

    res.status(200).json({ success: true, projects });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
