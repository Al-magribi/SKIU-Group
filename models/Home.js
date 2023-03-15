const mongoose = require("mongoose");

const HomeSchema = mongoose.Schema({
  slider: [{ url: { type: String, required: false } }],
  logo: { type: String, required: false },
  name: { type: String, required: false },
  tagline: { type: String, required: false },
  address: { type: String, required: false },
  email: { type: String, required: false },
  phone: { type: Number, required: false },
});

module.exports = mongoose.model("Home", HomeSchema);
