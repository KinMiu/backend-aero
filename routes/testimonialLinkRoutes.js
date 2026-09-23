import { Router } from "express";
import { getLinks, getActiveLink, createLink, deactivateLink, getLinkByToken } from "../controllers/testimonialLinkController.js";
import { authMiddleware, requireRole } from "../middleware/auth.js";

const router = Router();

// Public: check link validity by token
router.get("/token/:token", getLinkByToken);
router.get("/active", getActiveLink);

// Superadmin only
router.get("/", authMiddleware, requireRole("superadmin"), getLinks);
router.post("/", authMiddleware, requireRole("superadmin"), createLink);
router.put("/:id/deactivate", authMiddleware, requireRole("superadmin"), deactivateLink);

export default router;
