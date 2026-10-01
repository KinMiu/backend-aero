import { Router } from "express";
import { recordVisit, getVisitStats } from "../controllers/visitController.js";
import { authMiddleware, requireRole } from "../middleware/auth.js";

const router = Router();

router.post("/", recordVisit);
router.get("/stats", authMiddleware, requireRole("superadmin", "officialadmin"), getVisitStats);

export default router;
