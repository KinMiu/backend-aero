import { Router } from "express";
import {
  getActivePosters,
  getAllPosters,
  createPoster,
  updatePoster,
  deletePoster,
} from "../controllers/adPosterController.js";
import { authMiddleware, requireRole } from "../middleware/auth.js";

const router = Router();

// Public: anyone can view active posters
router.get("/active", getActivePosters);

// Superadmin only
router.get("/", authMiddleware, requireRole("superadmin"), getAllPosters);
router.post("/", authMiddleware, requireRole("superadmin"), createPoster);
router.put("/:id", authMiddleware, requireRole("superadmin"), updatePoster);
router.delete("/:id", authMiddleware, requireRole("superadmin"), deletePoster);

export default router;
