import { Router } from "express";
import { getRegistrations, getActiveRegistration, createRegistration, deleteRegistration } from "../controllers/openRegistrationController.js";
import { authMiddleware, requireRole } from "../middleware/auth.js";

const router = Router();

// Public: anyone can see active registration
router.get("/active", getActiveRegistration);

// Admin only
router.get("/", authMiddleware, requireRole("superadmin"), getRegistrations);
router.post("/", authMiddleware, requireRole("superadmin"), createRegistration);
router.delete("/:id", authMiddleware, requireRole("superadmin"), deleteRegistration);

export default router;
