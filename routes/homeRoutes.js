const express = require("express");
const router = express.Router();
const Home = require("../models/Home");

// CREATE WEB DATA => /api/web/create
router.post("/create", async (req, res) => {
  req.body.phone = req.body.phone.replace(/^0/, "62");

  try {
    const data = await Home.create(req.body);

    res.status(200).json({ message: "Berhasil dibuat", data });
  } catch (error) {
    res.status(500).json({ message: error });
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
    res.status(500).json({ message: error });
  }
});

// UPDATE WEB DATA => /api/web/update

router.put("/update-web/:id", async (req, res) => {
  try {
    let data = await Home.findById(req.params.id);

    req.body.phone = req.body.phone.replace(/^0/, "62");

    // Parse the string value of the slider field to an actual array of objects
    req.body.slider = JSON.parse(req.body.slider);

    unit = await Home.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(201).json({ message: "Berhasil diperbarui", data });
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

// router.put("/update-web/:id", async (req, res) => {
//   try {
//     let data = await Home.findById(req.params.id);

//     req.body.phone = req.body.phone.replace(/^0/, "62");

//     unit = await Home.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });

//     res.status(201).json({ message: "Berhasil diperbarui", data });
//   } catch (error) {
//     res.status(404).json({ message: error });
//   }
// });

module.exports = router;
