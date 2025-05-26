const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/add", userController.addUser);
router.get("/by-vendor/:vendorId", userController.getUsersByVendorId);
router.post("/assign-vendor", userController.assignUserToVendor);
router.get("/alluser", userController.getUsers);
router.put("/update/:userId", userController.updateUserById);
router.get("/:userId", userController.getUserById);
router.delete("/delete/:userId", userController.deleteUserById);

module.exports = router;
