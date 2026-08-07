import Order from "../models/Order.js";
import Product from "../models/Product.js";

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const { products } = req.body;

    // Check product stock first
    for (const item of products) {
      const product = await Product.findById(item.id);

      if (!product) {
        return res.status(404).json({
          message: `Product "${item.name}" not found`,
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

    // Create order
    const order = await Order.create(req.body);

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Get all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get logged-in user's orders
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.params.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json({
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete order and restore stock
export const deleteOrder = async (req, res) => {
  try {
    // Find the order first
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    // Restore product stock
    for (const item of order.products) {
      const product = await Product.findById(item.id);

      if (product) {
        product.stock += item.quantity;

        await product.save();
      }
    }

    // Delete the order
    await Order.findByIdAndDelete(req.params.id);

    res.json({
      message: "Order deleted and stock restored successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};
// Cancel order and restore stock
export const cancelOrder = async (req, res) => {
  try {
    // Find the order
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    // Only Pending and Confirmed orders can be cancelled
    if (
      order.status !== "Pending" &&
      order.status !== "Confirmed"
    ) {
      return res.status(400).json({
        message: "This order cannot be cancelled.",
      });
    }

    // Restore product stock
    for (const item of order.products) {
      const product = await Product.findById(item.id);

      if (product) {
        product.stock += item.quantity;

        await product.save();
      }
    }

    // Change order status
    order.status = "Cancelled";

    await order.save();

    res.status(200).json({
      message: "Order cancelled successfully and stock restored.",
      order,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};