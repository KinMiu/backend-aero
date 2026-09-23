import OpenRegistration from "../models/OpenRegistration.js";

export async function getRegistrations(req, res, next) {
  try {
    const items = await OpenRegistration.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    next(err);
  }
}

export async function getActiveRegistration(req, res, next) {
  try {
    const items = await OpenRegistration.find().sort({ createdAt: -1 }).limit(1);
    res.json(items[0] || null);
  } catch (err) {
    next(err);
  }
}

export async function createRegistration(req, res, next) {
  try {
    const { month, year } = req.body;
    if (!month || !year) {
      return res.status(400).json({ message: "Month and year are required" });
    }
    const item = await OpenRegistration.create({ month, year });
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
}

export async function deleteRegistration(req, res, next) {
  try {
    const item = await OpenRegistration.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Registration not found" });
    res.json({ message: "Registration deleted" });
  } catch (err) {
    next(err);
  }
}
