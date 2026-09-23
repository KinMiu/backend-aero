import Testimonial from "../models/Testimonial.js";
import TestimonialLink from "../models/TestimonialLink.js";

export async function getTestimonials(req, res, next) {
  try {
    const items = await Testimonial.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    next(err);
  }
}

export async function createTestimonial(req, res, next) {
  try {
    const { name, role, text, avatar, photoUrl, rating } = req.body;
    if (!name || !text) {
      return res.status(400).json({ message: "Name and text are required" });
    }
    const item = await Testimonial.create({ name, role, text, avatar, photoUrl, rating });
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
}

export async function createPublicTestimonial(req, res, next) {
  try {
    const link = await TestimonialLink.findOne({ token: req.params.token });
    if (!link) return res.status(404).json({ message: "Link not found" });
    if (!link.isActive || link.expiresAt <= new Date()) {
      return res.status(403).json({ message: "Link expired or inactive" });
    }

    const { name, role, text, avatar, photoUrl, rating } = req.body;
    if (!name || !text) {
      return res.status(400).json({ message: "Name and text are required" });
    }
    const item = await Testimonial.create({ name, role, text, avatar, photoUrl, rating });
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
}

export async function updateTestimonial(req, res, next) {
  try {
    const item = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: "Testimonial not found" });
    res.json(item);
  } catch (err) {
    next(err);
  }
}

export async function deleteTestimonial(req, res, next) {
  try {
    const item = await Testimonial.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Testimonial not found" });
    res.json({ message: "Testimonial deleted" });
  } catch (err) {
    next(err);
  }
}
