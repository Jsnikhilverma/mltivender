const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const upload = require("../middleware/upload");

router.post(
  "/add/:vendorId",
  upload.single("image"),
  productController.addProduct
);
router.get("/allproduct", productController.getProducts);
router.get("/by-vendor/:vendorId", productController.getProductsByVendor);
router.get("/:productId", productController.getProductByid);
router.delete("/delete/:productId", productController.deleteProductById);
router.put(
  "/update/:productId",
  upload.single("image"),
  productController.updateProductById
);

module.exports = router;
