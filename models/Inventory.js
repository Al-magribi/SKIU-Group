const mongoose = require("mongoose");

const InventorySchema = mongoose.Schema({
  img: { type: String, required: [true, "gambar harus dilengkapi"] },
  name: { type: String, required: [true, "nama inventaris harus diisi"] },
  unit: { type: String, required: [true, "jumlah unit harus diisi"] },
});

module.exports = mongoose.model("Inventory", InventorySchema);
