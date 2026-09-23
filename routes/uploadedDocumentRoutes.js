import { Router } from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { getDocuments, createDocument, deleteDocument, getPublicDocuments, createPublicDocument, deletePublicDocument } from "../controllers/uploadedDocumentController.js";
import { authMiddleware, requireRole } from "../middleware/auth.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: path.join(__dirname, "..", "uploads"),
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

const router = Router();

// Public: access via document link token
router.get("/public/:token", getPublicDocuments);
router.post("/public/:token", upload.single("file"), createPublicDocument);
router.delete("/public/:token/:docId", deletePublicDocument);

// Admin only
router.get("/", authMiddleware, requireRole("superadmin", "officialadmin"), getDocuments);
router.post("/", authMiddleware, requireRole("superadmin", "officialadmin"), upload.single("file"), createDocument);
router.delete("/:id", authMiddleware, requireRole("superadmin", "officialadmin"), deleteDocument);

export default router;
