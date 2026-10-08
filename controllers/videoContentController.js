import VideoContent from "../models/VideoContent.js";

export async function getVideoContent(req, res, next) {
  try {
    const items = await VideoContent.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    next(err);
  }
}

export async function getActiveVideo(req, res, next) {
  try {
    const item = await VideoContent.findOne({ isActive: true }).sort({ createdAt: -1 });
    res.json(item || null);
  } catch (err) {
    next(err);
  }
}

export async function createVideo(req, res, next) {
  try {
    const { title, videoData } = req.body;
    if (!videoData) {
      return res.status(400).json({ message: "Video wajib diupload" });
    }
    const item = await VideoContent.create({ title: title || "", videoData });
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
}

export async function deleteVideo(req, res, next) {
  try {
    const item = await VideoContent.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Video tidak ditemukan" });
    res.json({ message: "Video dihapus" });
  } catch (err) {
    next(err);
  }
}

export async function toggleVideo(req, res, next) {
  try {
    const { isActive } = req.body;
    const item = await VideoContent.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Video tidak ditemukan" });

    if (isActive) {
      await VideoContent.updateMany({}, { isActive: false });
      item.isActive = true;
    } else {
      item.isActive = false;
    }
    await item.save();
    res.json(item);
  } catch (err) {
    next(err);
  }
}
