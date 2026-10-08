import AdPoster from "../models/AdPoster.js";

export async function getActivePosters(req, res, next) {
  try {
    const now = new Date();
    const items = await AdPoster.find({
      startsAt: { $lte: now },
      endsAt: { $gt: now },
    }).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    next(err);
  }
}

export async function getAllPosters(req, res, next) {
  try {
    const now = new Date();
    const items = await AdPoster.find({ endsAt: { $gt: now } }).sort({
      createdAt: -1,
    });
    res.json(items);
  } catch (err) {
    next(err);
  }
}

export async function createPoster(req, res, next) {
  try {
    const { images, title, startsAt, endsAt, webinarId } = req.body;
    if (!images || images.length === 0) {
      return res.status(400).json({ message: "Minimal 1 gambar wajib diupload" });
    }
    if (!title) {
      return res.status(400).json({ message: "Judul poster wajib diisi" });
    }
    const start = new Date(startsAt);
    const end = new Date(endsAt);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ message: "Tanggal tidak valid" });
    }
    if (end.getTime() <= start.getTime()) {
      return res.status(400).json({ message: "Tanggal akhir harus setelah tanggal mulai" });
    }
    const item = await AdPoster.create({ images, title, startsAt: start, endsAt: end, webinarId: webinarId || null });
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
}

export async function updatePoster(req, res, next) {
  try {
    const { images, title, startsAt, endsAt, webinarId } = req.body;
    const item = await AdPoster.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Poster tidak ditemukan" });

    if (images !== undefined) item.images = images;
    if (title !== undefined) item.title = title;
    if (startsAt !== undefined) item.startsAt = new Date(startsAt);
    if (endsAt !== undefined) item.endsAt = new Date(endsAt);
    if (webinarId !== undefined) item.webinarId = webinarId || null;

    if (item.endsAt <= item.startsAt) {
      return res.status(400).json({ message: "Tanggal akhir harus setelah tanggal mulai" });
    }

    await item.save();
    res.json(item);
  } catch (err) {
    next(err);
  }
}

export async function deletePoster(req, res, next) {
  try {
    const item = await AdPoster.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Poster tidak ditemukan" });
    res.json({ message: "Poster dihapus" });
  } catch (err) {
    next(err);
  }
}
