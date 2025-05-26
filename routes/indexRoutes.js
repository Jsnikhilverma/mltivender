const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.post("/admin-register", adminController.registerAdmin);
router.post("/admin-login", adminController.loginAdmin);

router.post("/add-vendor", adminController.addVendor);
router.get("/get-vendors", adminController.getVendors);
router.get("/get-vendor/:id", adminController.getVendorById);
router.put("/update-vendor/:id", adminController.updateVendor);
router.delete("/delete-vendor/:id", adminController.deleteVendor);
// router.post("/add-product", adminController.addProduct);
// router.get("/get-products", adminController.getProducts);
// router.get("/get-product/:id", adminController.getProductById);
// router.put("/update-product/:id", adminController.updateProduct);
// router.delete("/delete-product/:id", adminController.deleteProduct);

// Add your admin/vendor routes here in future
module.exports = router;
