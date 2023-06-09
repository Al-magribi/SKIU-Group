const express = require("express");
const router = express.Router();
const Home = require("../models/Home");
const {
  authenticateToken,
  authorizeAdmin,
} = require("../handler/auth&authorize");

// CREATE WEB DATA => /api/web/create
router.post("/create", async (req, res) => {
  req.body.phone = req.body.phone.replace(/^0/, "62");

  try {
    const data = await Home.create(req.body);

    res.status(200).json({ message: "Berhasil dibuat", data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET WEB DATA => /api/admin/web/data
router.get("/data", async (req, res) => {
  try {
    const data = await Home.find();

    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

// GET DETAIL WEB DATA
router.get("/detail/:id", async (req, res) => {
  try {
    const data = await Home.findById(req.params.id);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE WEB DATA => /api/web/update

router.put(
  "/update/:id",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      let data = await Home.findById(req.params.id);

      req.body.phone = req.body.phone.replace(/^0/, "62");

      data = await Home.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      res.status(201).json({ message: "Berhasil diperbarui" });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
);

router.put("/update/:id", async (req, res) => {
  try {
    let data = await Home.findById(req.params.id);

    req.body.phone = req.body.phone.replace(/^0/, "62");

    data = await Home.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(201).json({ message: "Berhasil diperbarui", data });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
