import { Router } from "express";
import { getLinks, getLinkByStudent, createLink, deactivateLink, getLinkByToken } from "../controllers/documentLinkController.js";
import { authMiddleware, requireRole } from "../middleware/auth.js";

const router = Router();

// Public: check link validity by token
router.get("/token/:token", getLinkByToken);

// Admin only
router.get("/", authMiddleware, requireRole("superadmin", "officialadmin"), getLinks);
router.get("/student/:studentId", authMiddleware, requireRole("superadmin", "officialadmin"), getLinkByStudent);
router.post("/", authMiddleware, requireRole("superadmin", "officialadmin"), createLink);
router.put("/:id/deactivate", authMiddleware, requireRole("superadmin", "officialadmin"), deactivateLink);

export default router;
