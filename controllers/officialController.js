import bcrypt from "bcryptjs";
import OfficialAdmin from "../models/OfficialAdmin.js";

export async function getOfficials(req, res, next) {
  try {
    const officials = await OfficialAdmin.find().select("-password");
    res.json(officials);
  } catch (err) {
    next(err);
  }
}

export async function createOfficial(req, res, next) {
  try {
    const { name, email, phone, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }
    const existing = await OfficialAdmin.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: "Email already in use" });
    }
    const hashed = await bcrypt.hash(password, 10);
    const official = await OfficialAdmin.create({
      name,
      email: email.toLowerCase(),
      phone: phone || "",
      password: hashed,
    });
    res.status(201).json(official.toObject({ transform: (doc, ret) => { delete ret.password; return ret; } }));
  } catch (err) {
    next(err);
  }
}

export async function updateOfficial(req, res, next) {
  try {
    const { id } = req.params;
    const updates = { ...req.body };
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    } else {
      delete updates.password;
    }
    const official = await OfficialAdmin.findByIdAndUpdate(id, updates, { new: true }).select("-password");
    if (!official) return res.status(404).json({ message: "Official not found" });
    res.json(official);
  } catch (err) {
    next(err);
  }
}

export async function deleteOfficial(req, res, next) {
  try {
    const { id } = req.params;
    const official = await OfficialAdmin.findByIdAndDelete(id);
    if (!official) return res.status(404).json({ message: "Official not found" });
    res.json({ message: "Official deleted" });
  } catch (err) {
    next(err);
  }
}
