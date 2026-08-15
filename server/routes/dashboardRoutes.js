import express from "express";
import { getDashboardStats } from "../controllers/dashboardController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Dashboard Statistics
// Only logged-in admins can access
router.get("/", protect, adminOnly, getDashboardStats);

export default router;