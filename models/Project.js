const mongoose = require("mongoose");

const ProjectSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    img: { type: String, required: false },
    name: { type: String, required: true },
    location: { type: String, required: true },
    time: { type: String, required: true },
    contract: { type: String, required: true },
    progress: { type: String, required: true },
    value: { type: String, required: false },
    report: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", ProjectSchema);
