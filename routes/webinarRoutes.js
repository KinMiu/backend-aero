import { Router } from "express";
import {
  getActiveWebinars,
  getAllWebinars,
  getWebinarById,
  getWebinarByToken,
  createWebinar,
  updateWebinar,
  deleteWebinar,
  getRegistrations,
  registerWebinar,
} from "../controllers/webinarController.js";
import { authMiddleware, requireRole } from "../middleware/auth.js";

const router = Router();

// Public
router.get("/active", getActiveWebinars);
router.get("/public/:token", getWebinarByToken);
router.post("/:id/register", registerWebinar);

// Superadmin only
router.get("/", authMiddleware, requireRole("superadmin"), getAllWebinars);
router.get("/:id", authMiddleware, requireRole("superadmin"), getWebinarById);
router.post("/", authMiddleware, requireRole("superadmin"), createWebinar);
router.put("/:id", authMiddleware, requireRole("superadmin"), updateWebinar);
router.delete("/:id", authMiddleware, requireRole("superadmin"), deleteWebinar);
router.get("/:id/registrations", authMiddleware, requireRole("superadmin"), getRegistrations);

export default router;
