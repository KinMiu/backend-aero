import { Router } from "express";
import { getReRegistrationFee, upsertReRegistrationFee } from "../controllers/reRegistrationFeeController.js";
import { authMiddleware, requireRole } from "../middleware/auth.js";

const router = Router();

router.get("/", getReRegistrationFee);
router.put("/", authMiddleware, requireRole("superadmin"), upsertReRegistrationFee);

export default router;
