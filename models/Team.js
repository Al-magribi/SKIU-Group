const mongoose = require("mongoose");

const TeamSchema = mongoose.Schema({
  img: { type: String, required: [false, "Masukan gambar"] },
  name: { type: String, required: [true, "Nama harus dilengkapi"] },
  title: { type: String, required: [true, "Jabatan harus dilengkapi"] },
});

module.exports = mongoose.model("Team", TeamSchema);
