import { Router } from "express";
import { getOfficials, createOfficial, updateOfficial, deleteOfficial } from "../controllers/officialController.js";
import { authMiddleware, requireRole } from "../middleware/auth.js";

const router = Router();

router.use(authMiddleware, requireRole("superadmin"));

router.get("/", getOfficials);
router.post("/", createOfficial);
router.put("/:id", updateOfficial);
router.delete("/:id", deleteOfficial);

export default router;
