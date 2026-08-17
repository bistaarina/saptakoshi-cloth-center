import Order from "../models/Order.js";
import Product from "../models/Product.js";

// ===============================
// Create Order
// ===============================
export const createOrder = async (req, res) => {
  try {
    const { products } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({
        message: "No products found in the order.",
      });
    }

    // Check products and stock
    for (const item of products) {
      const product = await Product.findById(item.id);

      if (!product) {
        return res.status(404).json({
          message: `Product "${item.name}" not found.`,
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${product.name}. Available stock: ${product.stock}`,
        });
      }
    }

    // Reduce stock
    for (const item of products) {
      const product = await Product.findById(item.id);

      product.stock -= item.quantity;

      await product.save();
    }

    // Create order using logged-in user
    const order = await Order.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(201).json({
      message: "Order placed successfully.",
      order,
    });
  } catch (error) {
    console.error("Create Order Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// Get All Orders
// ===============================
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "fullName email")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Get Orders Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// Get My Orders
// ===============================
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.params.userId,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Get My Orders Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// Update Order Status
// ===============================
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found.",
      });
    }

    res.status(200).json({
      message: "Order status updated successfully.",
      order,
    });
  } catch (error) {
    console.error(
      "Update Order Status Error:",
      error
    );

    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// Cancel Order
// ===============================
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found.",
      });
    }

    if (
      order.status !== "Pending" &&
      order.status !== "Confirmed"
    ) {
      return res.status(400).json({
        message: "This order cannot be cancelled.",
      });
    }

    // Restore stock
    for (const item of order.products) {
      const product = await Product.findById(item.id);

      if (product) {
        product.stock += item.quantity;
        await product.save();
      }
    }

    order.status = "Cancelled";

    await order.save();

    res.status(200).json({
      message:
        "Order cancelled successfully and stock restored.",
      order,
    });
  } catch (error) {
    console.error("Cancel Order Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// Delete Order
// ===============================
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found.",
      });
    }

    // Restore stock if not already cancelled
    if (order.status !== "Cancelled") {
      for (const item of order.products) {
        const product = await Product.findById(
          item.id
        );

        if (product) {
          product.stock += item.quantity;
          await product.save();
        }
      }
    }

    await Order.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message:
        order.status === "Cancelled"
          ? "Cancelled order deleted successfully."
          : "Order deleted and stock restored successfully.",
    });
  } catch (error) {
    console.error("Delete Order Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};