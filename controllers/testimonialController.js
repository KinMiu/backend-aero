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
    const { name, role, text, avatar, photoUrl, media, rating } = req.body;
    if (!name || !text) {
      return res.status(400).json({ message: "Name and text are required" });
    }
    const item = await Testimonial.create({ name, role, text, avatar, photoUrl, media, rating });
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

    const { name, role, text, avatar, photoUrl, media, rating } = req.body;
    if (!name || !text) {
      return res.status(400).json({ message: "Name and text are required" });
    }
    const item = await Testimonial.create({ name, role, text, avatar, photoUrl, media, rating });
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

export async function seedTestimonials(req, res, next) {
  try {
    const existing = await Testimonial.countDocuments();
    if (existing > 0) {
      return res.json({ message: "Testimonials already seeded", count: existing });
    }
    const seedData = [
      {
        name: "Agus H.",
        role: "Alumni — Bekerja di Bandara Soekarno-Hatta",
        text: "Sekolah AVSEC di sini jelas dari segi harga dan lama pendidikan dibanding sama tempat lain sudah mahal terus lama ehh ujungnya sama aja dapet lisensi doang",
        avatar: "AH",
        rating: 5,
      },
      {
        name: "Dhofar I.",
        role: "Alumni — Personel AVSEC Bandara Juanda",
        text: "Hasil obrolan dengan temen2 di tempat kerja yang sebelumnya dari berbagai lemdik, terus terang lemdik ini yg paling masuk akal",
        avatar: "DI",
        rating: 5,
      },
      {
        name: "Denny S.",
        role: "Alumni — Personel AVSEC Bandara Ngurah Rai",
        text: "Mantab disediakan kopi gratis bebas refill biar belajarnya semangat",
        avatar: "DS",
        rating: 5,
      },
    ];
    await Testimonial.insertMany(seedData);
    res.status(201).json({ message: "Testimonials seeded", count: seedData.length });
  } catch (err) {
    next(err);
  }
}
