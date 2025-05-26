const express = require("express");
const router = express.Router();

const {
  createVendor,
  getVendors,
  getVendorById,
  updateVendor,
  deleteVendor,
  setVendorStatus,
} = require("../controllers/vendorController");

router.get("/", getVendors);
router.post("/create", createVendor);

router.get("/get/:id", getVendorById);
router.put("/update/:id", updateVendor);
router.delete("/delete/:id", deleteVendor);
router.put("/set-status/:id", setVendorStatus);

module.exports = router;
