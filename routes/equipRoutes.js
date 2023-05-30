const express = require("express");
const router = express.Router();
const Equipment = require("../models/Equipment");

// CREATE => /api/admin/equipment/create
router.post("/create", async (req, res) => {
  try {
    const unit = await Equipment.create(req.body);

    res.status(200).json({ message: "Berhasil ditambahkan", unit });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// DETAIL => /api/admin/equipment/detail/:id
router.get("/detail/:id", async (req, res) => {
  try {
    const unit = await Equipment.findById(req.params.id);

    res.status(200).json(unit);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// UPDATE => /api/admin/equipment/update/:id
router.put("/update/:id", async (req, res) => {
  try {
    let unit = await Equipment.findById(req.params.id);

    unit = await Equipment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(201).json({ message: "Berhasil diperbarui", unit });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// DELETE => /api/admin/equipment/delete/:id
router.delete("/delete/:id", async (req, res) => {
  try {
    const unit = await Equipment.findById(req.params.id);

    if (!unit) {
      res.status(404).json({ message: "Item tidak ditemukan" });
    }

    await unit.deleteOne();

    res.status(200).json({ message: "Berhasil dihapus" });
  } catch (error) {
    res.status(404).json({ error, message: `Tidak berhaasil dihapus` });
  }
});

// ALL INVENTORIES => /api/admin/equipment/all
router.get("/all", async (req, res) => {
  try {
    const units = await Equipment.find();

    res.status(200).json({ message: `${units.length} units`, units });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
