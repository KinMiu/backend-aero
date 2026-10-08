import Webinar from "../models/Webinar.js";
import WebinarRegistration from "../models/WebinarRegistration.js";

export async function getActiveWebinars(req, res, next) {
  try {
    const items = await Webinar.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    next(err);
  }
}

export async function getAllWebinars(req, res, next) {
  try {
    const items = await Webinar.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    next(err);
  }
}

export async function getWebinarById(req, res, next) {
  try {
    const item = await Webinar.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Webinar tidak ditemukan" });
    res.json(item);
  } catch (err) {
    next(err);
  }
}

export async function getWebinarByToken(req, res, next) {
  try {
    const item = await Webinar.findOne({ _id: req.params.token, isActive: true });
    if (!item) return res.status(404).json({ message: "Webinar tidak ditemukan atau tidak aktif" });
    res.json(item);
  } catch (err) {
    next(err);
  }
}

export async function createWebinar(req, res, next) {
  try {
    const { title, date, time, description, waLink, fields } = req.body;
    if (!title) return res.status(400).json({ message: "Nama webinar wajib diisi" });
    if (!date) return res.status(400).json({ message: "Tanggal webinar wajib diisi" });
    if (!time) return res.status(400).json({ message: "Jam webinar wajib diisi" });
    const item = await Webinar.create({
      title,
      date: new Date(date),
      time,
      description: description || "",
      waLink: waLink || "",
      fields: fields || [],
    });
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
}

export async function updateWebinar(req, res, next) {
  try {
    const { title, date, time, description, waLink, fields, isActive } = req.body;
    const item = await Webinar.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Webinar tidak ditemukan" });
    if (title !== undefined) item.title = title;
    if (date !== undefined) item.date = new Date(date);
    if (time !== undefined) item.time = time;
    if (description !== undefined) item.description = description;
    if (waLink !== undefined) item.waLink = waLink;
    if (fields !== undefined) item.fields = fields;
    if (isActive !== undefined) item.isActive = isActive;
    await item.save();
    res.json(item);
  } catch (err) {
    next(err);
  }
}

export async function deleteWebinar(req, res, next) {
  try {
    const item = await Webinar.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Webinar tidak ditemukan" });
    await WebinarRegistration.deleteMany({ webinarId: req.params.id });
    res.json({ message: "Webinar dihapus" });
  } catch (err) {
    next(err);
  }
}

export async function getRegistrations(req, res, next) {
  try {
    const items = await WebinarRegistration.find({ webinarId: req.params.id }).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    next(err);
  }
}

export async function registerWebinar(req, res, next) {
  try {
    const webinar = await Webinar.findOne({ _id: req.params.id, isActive: true });
    if (!webinar) return res.status(404).json({ message: "Webinar tidak ditemukan atau tidak aktif" });
    const { data } = req.body;
    if (!data) return res.status(400).json({ message: "Data pendaftaran wajib diisi" });
    for (const field of webinar.fields) {
      if (field.required && !data[field.label]) {
        return res.status(400).json({ message: `${field.label} wajib diisi` });
      }
    }
    const reg = await WebinarRegistration.create({ webinarId: req.params.id, data });
    res.status(201).json({ registration: reg, waLink: webinar.waLink });
  } catch (err) {
    next(err);
  }
}
