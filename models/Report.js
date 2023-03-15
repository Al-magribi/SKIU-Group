const mongoose = require("mongoose");

const ReportSchema = mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Project",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: { type: String, required: [true, "masukan nama laporan"] },
    url: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", ReportSchema);
