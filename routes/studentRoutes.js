import { Router } from "express";
import {
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentByToken,
  submitPayment,
  submitReRegistrationPayment,
  resetReRegistrationPayment,
  confirmPayment,
  confirmReRegistrationPayment,
  scheduleInterview,
  setInterviewResult,
} from "../controllers/studentController.js";
import { authMiddleware, requireRole } from "../middleware/auth.js";

const router = Router();

// Public: anyone can register as a student
router.post("/", createStudent);

// Public: tracking by token
router.get("/track/:token", getStudentByToken);
router.put("/pay/:token", submitPayment);
router.put("/re-registration-pay/:token", submitReRegistrationPayment);
router.put("/re-registration-reset/:token", resetReRegistrationPayment);

// Admin only
router.get("/", authMiddleware, requireRole("superadmin", "officialadmin"), getStudents);
router.get("/:id", authMiddleware, requireRole("superadmin", "officialadmin"), getStudent);
router.put("/:id", authMiddleware, requireRole("superadmin", "officialadmin"), updateStudent);
router.delete("/:id", authMiddleware, requireRole("superadmin"), deleteStudent);

// Superadmin only: confirm payment
router.put("/:id/confirm-payment", authMiddleware, requireRole("superadmin"), confirmPayment);
router.put("/:id/confirm-re-registration", authMiddleware, requireRole("superadmin", "officialadmin"), confirmReRegistrationPayment);
router.put("/:id/schedule-interview", authMiddleware, requireRole("superadmin", "officialadmin"), scheduleInterview);
router.put("/:id/interview-result", authMiddleware, requireRole("superadmin", "officialadmin"), setInterviewResult);

export default router;
