const express = require("express");
const router = express.Router();
const {
  authenticateToken,
  authorizeAdmin,
} = require("../handler/auth&authorize");
const Inventory = require("../models/Inventory");

// CREATE => /api/admin/inventory/create
router.post("/create", authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const inventory = await Inventory.create(req.body);

    res.status(200).json({ message: "Berhasil ditambahkan", inventory });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// DETAIL => /api/admin/inventory/detail/:id
router.get(
  "/detail/:id",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      const unit = await Inventory.findById(req.params.id);

      res.status(200).json(unit);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
);

// UPDATE => /api/admin/inventory/update/:id
router.put(
  "/update/:id",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      let unit = await Inventory.findById(req.params.id);

      unit = await Inventory.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      res.status(201).json({ message: "Berhasil diperbarui", unit });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
);

// DELETE => /api/admin/inventory/delete/:id
router.delete(
  "/delete/:id",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      const unit = await Inventory.findById(req.params.id);

      if (!unit) {
        res.status(404).json({ message: "Inventaris tidak ditemukan" });
      }

      await unit.deleteOne();

      res.status(200).json({ message: "Berhasil dihapus" });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
);

// ALL INVENTORIES => /api/admin/inventory/all
router.get("/all", async (req, res) => {
  try {
    const units = await Inventory.find();

    res.status(200).json({ message: `${units.length} units`, units });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
