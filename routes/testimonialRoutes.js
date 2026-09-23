import { Router } from "express";
import { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial, createPublicTestimonial } from "../controllers/testimonialController.js";
import { authMiddleware, requireRole } from "../middleware/auth.js";

const router = Router();

// Public: anyone can read testimonials
router.get("/", getTestimonials);

// Public: submit testimonial via share link token
router.post("/public/:token", createPublicTestimonial);

// Superadmin only
router.post("/", authMiddleware, requireRole("superadmin"), createTestimonial);
router.put("/:id", authMiddleware, requireRole("superadmin"), updateTestimonial);
router.delete("/:id", authMiddleware, requireRole("superadmin"), deleteTestimonial);

export default router;
