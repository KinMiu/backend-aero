import RegistrationFee from "../models/RegistrationFee.js";

export async function getRegistrationFee(req, res, next) {
  try {
    const items = await RegistrationFee.find().sort({ createdAt: -1 }).limit(1);
    res.json(items[0] || null);
  } catch (err) {
    next(err);
  }
}

export async function upsertRegistrationFee(req, res, next) {
  try {
    const { qrisImage, bankAccounts, amount } = req.body;
    const existing = await RegistrationFee.findOne();
    if (existing) {
      existing.qrisImage = qrisImage ?? existing.qrisImage;
      existing.bankAccounts = bankAccounts ?? existing.bankAccounts;
      existing.amount = amount ?? existing.amount;
      await existing.save();
      res.json(existing);
    } else {
      const item = await RegistrationFee.create({ qrisImage, bankAccounts, amount });
      res.status(201).json(item);
    }
  } catch (err) {
    next(err);
  }
}
