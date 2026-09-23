import bcrypt from "bcryptjs";
import OfficialAdmin from "../models/OfficialAdmin.js";
import { signToken } from "../middleware/auth.js";

const SUPERADMIN_EMAIL = "admin@gmail.com";
const SUPERADMIN_PASSWORD = "admin123";

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Super admin check
    if (email === SUPERADMIN_EMAIL && password === SUPERADMIN_PASSWORD) {
      const token = signToken({ role: "superadmin", name: "Super Admin", email });
      return res.json({
        token,
        user: { role: "superadmin", name: "Super Admin", email },
      });
    }

    // Official admin check
    const official = await OfficialAdmin.findOne({ email: email.toLowerCase() });
    if (!official) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, official.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = signToken({
      role: "officialadmin",
      name: official.name,
      email: official.email,
      id: official._id,
    });
    res.json({
      token,
      user: { role: "officialadmin", name: official.name, email: official.email },
    });
  } catch (err) {
    next(err);
  }
}

export function getMe(req, res) {
  res.json({ user: req.user });
}
