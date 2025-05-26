const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // only if assigned
});

module.exports = mongoose.model("User", userSchema);
