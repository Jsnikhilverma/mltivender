const User = require("../models/User");

exports.addUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getUsersByVendorId = async (req, res) => {
  try {
    const users = await User.find({ vendorId: req.params.vendorId });
    res.status(200).json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.assignUserToVendor = async (req, res) => {
  try {
    const { userId, vendorId } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      { vendorId },
      { new: true }
    );
    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.updateUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const updates = req.body;
    const user = await User.findByIdAndUpdate(userId, updates, { new: true });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
