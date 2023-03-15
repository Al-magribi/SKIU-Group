const mongoose = require("mongoose");

const EquipmentSchema = mongoose.Schema({
  img: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, required: false },
  unit: { type: String, required: true },
});

module.exports = mongoose.model("Equipment", EquipmentSchema);
