import express from "express";

import {
  createOrder,
  getOrders,
  getMyOrders,
  updateOrderStatus,
  deleteOrder,
  cancelOrder,
} from "../controllers/orderController.js";

const router = express.Router();

// Create Order
router.post("/", createOrder);

// Get All Orders
router.get("/", getOrders);

// Get User Orders
router.get("/user/:userId", getMyOrders);

// Cancel Order
router.put("/cancel/:id", cancelOrder);

// Update Order Status
router.put("/:id", updateOrderStatus);

// Delete Order
router.delete("/:id", deleteOrder);

export default router;