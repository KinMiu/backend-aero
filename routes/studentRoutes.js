import { Router } from "express";
import { getStudents, getStudent, createStudent, updateStudent, deleteStudent } from "../controllers/studentController.js";
import { authMiddleware, requireRole } from "../middleware/auth.js";

const router = Router();

// Public: anyone can register as a student
router.post("/", createStudent);

// Admin only
router.get("/", authMiddleware, requireRole("superadmin", "officialadmin"), getStudents);
router.get("/:id", authMiddleware, requireRole("superadmin", "officialadmin"), getStudent);
router.put("/:id", authMiddleware, requireRole("superadmin", "officialadmin"), updateStudent);
router.delete("/:id", authMiddleware, requireRole("superadmin"), deleteStudent);

export default router;
