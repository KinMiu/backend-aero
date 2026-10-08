import { Router } from "express";
import { getVideoSettings, getPublicVideoSettings, toggleDefaultVideo } from "../controllers/videoSettingController.js";
import { authMiddleware, requireRole } from "../middleware/auth.js";

const router = Router();

router.get("/", authMiddleware, requireRole("superadmin"), getVideoSettings);
router.get("/public", getPublicVideoSettings);
router.put("/default-toggle", authMiddleware, requireRole("superadmin"), toggleDefaultVideo);

export default router;
