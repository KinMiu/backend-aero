import DocumentSetting from "../models/DocumentSetting.js";

export async function getDocumentSettings(req, res, next) {
  try {
    const settings = await DocumentSetting.find().sort({ createdAt: 1 });
    res.json(settings);
  } catch (err) {
    next(err);
  }
}

export async function getActiveDocumentSettings(req, res, next) {
  try {
    const settings = await DocumentSetting.find({ isActive: true }).sort({ createdAt: 1 });
    res.json(settings);
  } catch (err) {
    next(err);
  }
}

export async function createDocumentSetting(req, res, next) {
  try {
    const { label, fileType, required, isActive } = req.body;
    if (!label || !label.trim()) {
      return res.status(400).json({ message: "Label wajib diisi" });
    }
    const setting = await DocumentSetting.create({
      label: label.trim(),
      fileType: fileType || "any",
      required: !!required,
      isActive: isActive !== false,
    });
    res.status(201).json(setting);
  } catch (err) {
    next(err);
  }
}

export async function updateDocumentSetting(req, res, next) {
  try {
    const { label, fileType, required, isActive } = req.body;
    const update = {};
    if (label !== undefined) update.label = label.trim();
    if (fileType !== undefined) update.fileType = fileType;
    if (required !== undefined) update.required = !!required;
    if (isActive !== undefined) update.isActive = !!isActive;

    const setting = await DocumentSetting.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true }
    );
    if (!setting) return res.status(404).json({ message: "Setting not found" });
    res.json(setting);
  } catch (err) {
    next(err);
  }
}

export async function deleteDocumentSetting(req, res, next) {
  try {
    const setting = await DocumentSetting.findByIdAndDelete(req.params.id);
    if (!setting) return res.status(404).json({ message: "Setting not found" });
    res.json({ message: "Setting deleted" });
  } catch (err) {
    next(err);
  }
}
