const express = require("express");
const {
  authenticateToken,
  authorizeAdmin,
} = require("../handler/auth&authorize");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Team = require("../models/Team");

// CREATE => /api/team/create
router.post(
  "/create",
  authenticateToken,
  authorizeAdmin,
  asyncHandler(async (req, res) => {
    try {
      const team = await Team.create(req.body);

      res.status(200).json({ message: "Berhasil ditambahkan", team });
    } catch (error) {
      res.status(404).json({ message: error });
    }
  })
);

// DETAIL => /api/admin/team/detail/:id
router.get(
  "/detail/:id",
  authenticateToken,
  authorizeAdmin,
  asyncHandler(async (req, res) => {
    try {
      const team = await Team.findOne({ _id: req.params.id });

      if (!team) {
        return res.status(404).json({ message: "Team not found" });
      }

      res.status(200).json(team);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  })
);

// UPDATE => /api/admin/team/update/:id
router.put(
  "/update/:id",
  authenticateToken,
  authorizeAdmin,
  asyncHandler(async (req, res) => {
    try {
      let team = await Team.findOne({ _id: req.params.id });

      if (!team) {
        return res.status(404).json({ message: "Team not found" });
      }

      team = await Team.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      res.status(201).json({ message: "Berhasil diperbarui", team });
    } catch (error) {
      res.status(404).json({ message: error });

      throw new Error(error);
    }
  })
);

// DELETE => /api/admin/team/delete/:id
router.delete(
  "/delete/:id",
  authenticateToken,
  authorizeAdmin,
  asyncHandler(async (req, res) => {
    try {
      const team = await Team.findById(req.params.id);

      if (!team) {
        res.status(404).json({ message: "User tidak ditemukan" });
      }

      await team.deleteOne();

      res.status(200).json({ message: "Berhasil dihapus" });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  })
);

// ALL USERS => /api/admin/team/all
router.get(
  "/all",
  asyncHandler(async (req, res) => {
    try {
      const team = await Team.find();

      res.status(200).json({ team });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  })
);

module.exports = router;
