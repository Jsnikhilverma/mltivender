const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  company: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  logoUrl: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  storeURL: {
    type: String,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

module.exports = mongoose.model("Vendor", vendorSchema);
