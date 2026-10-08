import VideoSetting from "../models/VideoSetting.js";

async function getSettings() {
  let settings = await VideoSetting.findOne();
  if (!settings) {
    settings = await VideoSetting.create({ defaultVideoEnabled: true });
  }
  return settings;
}

export async function getVideoSettings(req, res, next) {
  try {
    const settings = await getSettings();
    res.json(settings);
  } catch (err) {
    next(err);
  }
}

export async function getPublicVideoSettings(req, res, next) {
  try {
    const settings = await getSettings();
    res.json({ defaultVideoEnabled: settings.defaultVideoEnabled });
  } catch (err) {
    next(err);
  }
}

export async function toggleDefaultVideo(req, res, next) {
  try {
    const { enabled } = req.body;
    const settings = await getSettings();
    settings.defaultVideoEnabled = !!enabled;
    await settings.save();
    res.json(settings);
  } catch (err) {
    next(err);
  }
}
