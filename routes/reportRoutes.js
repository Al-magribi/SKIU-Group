const express = require("express");
const router = express.Router();
const Report = require("../models/Report");
const Project = require("../models/Project");
const asyncHandler = require("express-async-handler");
const { authenticateToken } = require("../handler/auth&authorize");

// CREATE
router.post(
  "/create",
  authenticateToken,
  asyncHandler(async (req, res) => {
    try {
      req.body.user = req.user.id;

      const report = await Report.create(req.body);

      res.status(200).json(report);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  })
);

// DETAIL
router.get(
  "/detail/:id",
  authenticateToken,
  asyncHandler(async (req, res) => {
    try {
      const report = await Report.findById(req.params.id);

      const project = await Project.findOne({ _id: report.project });

      res.status(200).json({ report, project });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  })
);

module.exports = router;
