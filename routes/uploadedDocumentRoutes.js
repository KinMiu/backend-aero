import { Router } from "express";
import {
  getDocuments,
  createDocument,
  deleteDocument,
  getPublicDocuments,
  createPublicDocument,
  deletePublicDocument,
  getDocumentsByTrackToken,
  createTrackingDocument,
  deleteTrackingDocument,
} from "../controllers/uploadedDocumentController.js";
import { authMiddleware, requireRole } from "../middleware/auth.js";

const router = Router();

// Public: access via document link token
router.get("/public/:token", getPublicDocuments);
router.post("/public/:token", createPublicDocument);
router.delete("/public/:token/:docId", deletePublicDocument);

// Public: get documents by tracking token
router.get("/track/:token", getDocumentsByTrackToken);
router.post("/track/:token", createTrackingDocument);
router.delete("/track/:token/:docId", deleteTrackingDocument);

// Admin only
router.get("/", authMiddleware, requireRole("superadmin", "officialadmin"), getDocuments);
router.post("/", authMiddleware, requireRole("superadmin", "officialadmin"), createDocument);
router.delete("/:id", authMiddleware, requireRole("superadmin", "officialadmin"), deleteDocument);

export default router;
