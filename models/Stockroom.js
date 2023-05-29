const mongoose = require("mongoose");

const StockroomSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    good: { type: Number, required: false },
    bad: { type: Number, required: true },
    total: { type: Number, required: true },
    ket: { type: String, required: false },
    pj: { type: String, required: false },
    note: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Stockroom", StockroomSchema);
