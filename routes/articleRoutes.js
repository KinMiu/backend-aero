import { Router } from "express";
import { getArticles, getArticleBySlug, createArticle, updateArticle, deleteArticle } from "../controllers/articleController.js";
import { authMiddleware, requireRole } from "../middleware/auth.js";

const router = Router();

// Public: anyone can read articles
router.get("/", getArticles);
router.get("/:slug", getArticleBySlug);

// Superadmin only
router.post("/", authMiddleware, requireRole("superadmin"), createArticle);
router.put("/:id", authMiddleware, requireRole("superadmin"), updateArticle);
router.delete("/:id", authMiddleware, requireRole("superadmin"), deleteArticle);

export default router;
