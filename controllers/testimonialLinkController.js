import crypto from "crypto";
import TestimonialLink from "../models/TestimonialLink.js";

export async function getLinks(req, res, next) {
  try {
    const links = await TestimonialLink.find().sort({ createdAt: -1 });
    res.json(links);
  } catch (err) {
    next(err);
  }
}

export async function getActiveLink(req, res, next) {
  try {
    const link = await TestimonialLink.findOne({ isActive: true, expiresAt: { $gt: new Date() } });
    res.json(link || null);
  } catch (err) {
    next(err);
  }
}

export async function createLink(req, res, next) {
  try {
    await TestimonialLink.updateMany({ isActive: true }, { isActive: false });
    const token = crypto.randomBytes(16).toString("hex");
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const link = await TestimonialLink.create({ token, expiresAt, isActive: true });
    res.status(201).json(link);
  } catch (err) {
    next(err);
  }
}

export async function deactivateLink(req, res, next) {
  try {
    const link = await TestimonialLink.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    if (!link) return res.status(404).json({ message: "Link not found" });
    res.json(link);
  } catch (err) {
    next(err);
  }
}

export async function getLinkByToken(req, res, next) {
  try {
    const link = await TestimonialLink.findOne({ token: req.params.token });
    if (!link) return res.status(404).json({ message: "Link not found" });
    const valid = link.isActive && link.expiresAt > new Date();
    res.json({ link, valid });
  } catch (err) {
    next(err);
  }
}
