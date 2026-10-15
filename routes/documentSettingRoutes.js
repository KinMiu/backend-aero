import { Router } from "express";
import {
  getDocumentSettings,
  getActiveDocumentSettings,
  createDocumentSetting,
  updateDocumentSetting,
  deleteDocumentSetting,
} from "../controllers/documentSettingController.js";
import { authMiddleware, requireRole } from "../middleware/auth.js";

const router = Router();

// Public: active document settings (for public upload page)
router.get("/active", getActiveDocumentSettings);

// Admin only
router.get("/", authMiddleware, requireRole("superadmin"), getDocumentSettings);
router.post("/", authMiddleware, requireRole("superadmin"), createDocumentSetting);
router.put("/:id", authMiddleware, requireRole("superadmin"), updateDocumentSetting);
router.delete("/:id", authMiddleware, requireRole("superadmin"), deleteDocumentSetting);

export default router;
