const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  description: String,
  imageUrl: String,
  stock: Number,
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor" },
  // vendor: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor" },
});

module.exports = mongoose.model("Product", productSchema);
