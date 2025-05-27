const Vendor = require("../models/Vendor");

exports.createVendor = async (req, res) => {
  try {
    console.log("Creating vendor with data:", req.body);
    const { name, company, email, phone, address, storeURL } = req.body;

    // Check for duplicate email
    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      return res
        .status(400)
        .json({ message: "Vendor with this email already exists" });
    }

    const newVendor = new Vendor({
      name,
      company,
      email,
      phone,
      address,
      storeURL,
    });

    const savedVendor = await newVendor.save();
    res
      .status(201)
      .json({ message: "Vendor created successfully", vendor: savedVendor });
  } catch (error) {
    console.error("Error creating vendor:", error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.status(200).json(vendors);
  } catch (error) {
    console.error("Error fetching vendors:", error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.getVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    res.status(200).json(vendor);
  } catch (error) {
    console.error("Error fetching vendor:", error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.updateVendor = async (req, res) => {
  try {
    console.log("Updating vendor with data:", req.body);

    const { name, company, email, phone, address, storeURL } = req.body;

    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor && existingVendor._id.toString() !== req.params.id) {
      return res
        .status(400)
        .json({ message: "Email already in use by another vendor" });
    }

    const updatedVendor = await Vendor.findByIdAndUpdate(req.params.id, {
      name,
      company,
      email,
      phone,
      address,
      storeURL,
    });

    if (!updatedVendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res
      .status(200)
      .json({ message: "Vendor updated successfully", vendor: updatedVendor });
  } catch (error) {
    console.error("Error updating vendor:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteVendor = async (req, res) => {
  try {
    const deletedVendor = await Vendor.findByIdAndDelete(req.params.id);
    if (!deletedVendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    res.status(200).json({ message: "Vendor deleted successfully" });
  } catch (error) {
    console.error("Error deleting vendor:", error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.searchVendors = async (req, res) => {
  try {
    const { query } = req.query;
    const vendors = await Vendor.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { company: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
        { phone: { $regex: query, $options: "i" } },
      ],
    });
    res.status(200).json(vendors);
  } catch (error) {
    console.error("Error searching vendors:", error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.getVendorByEmail = async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ email: req.params.email });
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    res.status(200).json(vendor);
  } catch (error) {
    console.error("Error fetching vendor by email:", error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.getVendorByPhone = async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ phone: req.params.phone });
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    res.status(200).json(vendor);
  } catch (error) {
    console.error("Error fetching vendor by phone:", error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.setVendorStatus = async (req, res) => {
  try {
    const { status } = req.body; // status should be "active" or "inactive"

    if (!["active", "inactive"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedVendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedVendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res.status(200).json({
      message: "Vendor status updated successfully",
      vendor: updatedVendor,
    });
  } catch (error) {
    console.error("Error updating vendor status:", error);
    res.status(500).json({ message: "Server error" });
  }
};
