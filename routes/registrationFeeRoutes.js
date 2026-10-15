import { Router } from "express";
import { getRegistrationFee, upsertRegistrationFee } from "../controllers/registrationFeeController.js";
import { authMiddleware, requireRole } from "../middleware/auth.js";

const router = Router();

// Public: anyone can view the registration fee info
router.get("/", getRegistrationFee);

// Admin only
router.put("/", authMiddleware, requireRole("superadmin"), upsertRegistrationFee);

export default router;
