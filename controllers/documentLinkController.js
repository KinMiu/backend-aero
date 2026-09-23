import crypto from "crypto";
import DocumentLink from "../models/DocumentLink.js";
import Student from "../models/Student.js";

export async function getLinks(req, res, next) {
  try {
    const links = await DocumentLink.find().sort({ createdAt: -1 });
    res.json(links);
  } catch (err) {
    next(err);
  }
}

export async function getLinkByStudent(req, res, next) {
  try {
    const link = await DocumentLink.findOne({
      studentId: req.params.studentId,
      isActive: true,
      expiresAt: { $gt: new Date() },
    });
    res.json(link || null);
  } catch (err) {
    next(err);
  }
}

export async function createLink(req, res, next) {
  try {
    const { studentId } = req.body;
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });

    await DocumentLink.updateMany({ studentId, isActive: true }, { isActive: false });
    const token = crypto.randomBytes(16).toString("hex");
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const link = await DocumentLink.create({
      token,
      studentId,
      studentName: student.nama,
      expiresAt,
      isActive: true,
    });
    res.status(201).json(link);
  } catch (err) {
    next(err);
  }
}

export async function deactivateLink(req, res, next) {
  try {
    const link = await DocumentLink.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    if (!link) return res.status(404).json({ message: "Link not found" });
    res.json(link);
  } catch (err) {
    next(err);
  }
}

export async function getLinkByToken(req, res, next) {
  try {
    const link = await DocumentLink.findOne({ token: req.params.token });
    if (!link) return res.status(404).json({ message: "Link not found" });
    const valid = link.isActive && link.expiresAt > new Date();
    res.json({ link, valid });
  } catch (err) {
    next(err);
  }
}
