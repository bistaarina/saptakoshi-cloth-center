import express from "express";

import {
  createOrder,
  getOrders,
  getMyOrders,
  updateOrderStatus,
  deleteOrder,
  cancelOrder,
} from "../controllers/orderController.js";

import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Customer creates order
router.post("/", protect, createOrder);

// Admin gets all orders
router.get(
  "/",
  protect,
  adminOnly,
  getOrders
);

// Customer gets own orders
router.get(
  "/user/:userId",
  protect,
  getMyOrders
);

// Customer cancels order
router.put(
  "/cancel/:id",
  protect,
  cancelOrder
);

// Admin updates order status
router.put(
  "/:id",
  protect,
  adminOnly,
  updateOrderStatus
);

// Admin deletes order
router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteOrder
);

export default router;