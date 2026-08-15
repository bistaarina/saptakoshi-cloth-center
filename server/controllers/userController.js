import User from "../models/User.js";

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json(users);
  } catch (error) {
    console.error("Get users error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    // Find the user first
    const user = await User.findById(req.params.id);

    // Check if user exists
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Prevent deleting an admin
    if (user.role === "admin") {
      return res.status(400).json({
        message: "Admin account cannot be deleted.",
      });
    }

    // Delete customer
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Customer deleted successfully.",
    });
  } catch (error) {
    console.error("Delete user error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};