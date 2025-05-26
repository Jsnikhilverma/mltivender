const express = require("express");
const multer = require("multer");
const Vendor = require("../models/Vendor");
const Product = require("../models/Product");
const generateCatalogPDF = require("../utils/pdfGenerator");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/export/:vendorId", upload.single("logo"), async (req, res) => {
  try {
    const { includeStock, style } = req.body;

    const vendor = await Vendor.findById(req.params.vendorId);
    if (!vendor) return res.status(404).json({ error: "Vendor not found" });

    const products = await Product.find({ vendor: vendor._id });

    const logoBuffer = req.file ? req.file.buffer : null;

    generateCatalogPDF(
      {
        vendor,
        products,
        logoBuffer,
        includeStock: includeStock === "true",
        style,
      },
      res
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "PDF export failed" });
  }
});

module.exports = router;
