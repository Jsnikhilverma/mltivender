const Product = require("../models/Product");

exports.addProduct = async (req, res) => {
  try {
    const vendorId = req.params.vendorId; // Assuming vendorId is sent as a route parameter
    const { name, price, category, description } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const product = new Product({
      name,
      price,
      category,
      description,
      vendorId,
      imageUrl,
    });
    await product.save();
    res.status(201).json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
exports.getProductsByVendor = async (req, res) => {
  try {
    const vendorId = req.params.vendorId;

    // Find products matching the vendorId and populate vendor details with selected fields
    const products = await Product.find({ vendorId }).populate(
      "vendorId",
      "name email phone otherFields" // Replace 'otherFields' with actual vendor fields you want
    );

    res.status(200).json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getProductByid = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.deleteProductById = async (req, res) => {
  try {
    const productId = req.params.productId; // Assuming productId is sent as a route parameter
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.updateProductById = async (req, res) => {
  try {
    const productId = req.params.productId; // Assuming productId is sent as a route parameter
    const { name, price, category, description } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { name, price, category, description, imageUrl },
      { new: true }
    );

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, product: updatedProduct });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
