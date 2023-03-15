const express = require("express");
const router = express.Router();
const {
  authenticateToken,
  authorizeAdmin,
} = require("../handler/auth&authorize");
const Project = require("../models/Project");
const User = require("../models/User");
const Report = require("../models/Report");

// CREATE => /api/admin/project/create
router.post("/create", authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const project = await Project.create(req.body);

    res.status(200).json({ message: "Berhasil ditambahkan", project });
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

// DETAIL => /api/project/detail/:id
router.get("/detail/:id", authenticateToken, async (req, res) => {
  try {
    const unit = await Project.findOne({ _id: req.params.id });

    const user = await User.findOne({ _id: unit.user });

    const report = await Report.find({ project: unit._id });

    res.status(200).json({ unit, user, report });
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

// DETAIL PROJECT AND ITS USER => /api/project/project-user

// UPDATE => /api/project/update/:id
router.put("/update/:id", authenticateToken, async (req, res) => {
  try {
    let unit = await Project.findOne({ _id: req.params.id });

    unit = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(201).json({ message: "Berhasil diperbarui", unit });
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

// DELETE => /api/admin/project/delete/:id
router.delete(
  "/delete/:id",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      const unit = await Project.findById(req.params.id);

      if (!unit) {
        res.status(404).json({ message: "Inventaris tidak ditemukan" });
      }

      await unit.deleteOne();

      res.status(200).json({ message: "Berhasil dihapus" });
    } catch (error) {
      res.status(404).json({ error, message: `Tidak berhaasil dihapus` });
    }
  }
);

// ALL PROJECTS => /api/admin/project/all
router.get("/all", async (req, res) => {
  try {
    const units = await Project.find();

    res.status(200).json({ units });
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

// MY PROJECT
router.get("/myproject", authenticateToken, async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user._id });

    res.status(200).json(projects);
  } catch (error) {
    res.status(404).json({ error, message: "Tidak ditemukan" });
  }
});

module.exports = router;
