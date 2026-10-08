import { Router } from "express";
import { getVideoContent, getActiveVideo, createVideo, deleteVideo, toggleVideo } from "../controllers/videoContentController.js";
import { authMiddleware, requireRole } from "../middleware/auth.js";

const router = Router();

router.get("/", authMiddleware, requireRole("superadmin"), getVideoContent);
router.get("/active", getActiveVideo);
router.post("/", authMiddleware, requireRole("superadmin"), createVideo);
router.delete("/:id", authMiddleware, requireRole("superadmin"), deleteVideo);
router.put("/:id/toggle", authMiddleware, requireRole("superadmin"), toggleVideo);

export default router;
