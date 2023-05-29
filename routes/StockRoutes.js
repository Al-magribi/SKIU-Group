const express = require("express");
const router = express.Router();
const Stockroom = require("../models/Stockroom");
const {
  authenticateToken,
  authorizeAdminStock,
} = require("../handler/auth&authorize");

router.post(
  "/create",
  authenticateToken,
  authorizeAdminStock,
  async (req, res) => {
    try {
      const stock = await Stockroom.create(req.body);

      return res.status(200).json({ message: "Berhasil ditambahkan", stock });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

router.get("/detail/:id", authenticateToken, async (req, res) => {
  try {
    const stock = await Stockroom.findById(req.params.id);

    if (!stock) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    return res.status(200).json(stock);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.put(
  "/update/:id",
  authenticateToken,
  authorizeAdminStock,
  async (req, res) => {
    try {
      let stock = await Stockroom.findById(req.params.id);

      stock = await Stockroom.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      return res.status(200).json({ message: "Berhasil diperbarui" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

router.delete(
  "/delete/:id",
  authenticateToken,
  authorizeAdminStock,
  async (req, res) => {
    try {
      const stock = await Stockroom.findById(req.params.id);

      if (!stock) {
        return res.status(404).json({ message: "data tidak ditemukan" });
      }

      await stock.deleteOne();

      res.status(200).json({ message: "Berhasil dihapus" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

router.get("/all", async (req, res) => {
  try {
    const stocks = await Stockroom.find().sort({ createdAt: -1 });

    res.status(200).json(stocks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
