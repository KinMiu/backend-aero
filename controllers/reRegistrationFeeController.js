import ReRegistrationFee from "../models/ReRegistrationFee.js";

export async function getReRegistrationFee(req, res, next) {
  try {
    const items = await ReRegistrationFee.find().sort({ createdAt: -1 }).limit(1);
    res.json(items[0] || null);
  } catch (err) {
    next(err);
  }
}

export async function upsertReRegistrationFee(req, res, next) {
  try {
    const { amount, bankName, accountHolder, accountNumber, whatsappGroupLink, whatsappAdminNumber } = req.body;
    const existing = await ReRegistrationFee.findOne();
    if (existing) {
      existing.amount = amount ?? existing.amount;
      existing.bankName = bankName ?? existing.bankName;
      existing.accountHolder = accountHolder ?? existing.accountHolder;
      existing.accountNumber = accountNumber ?? existing.accountNumber;
      existing.whatsappGroupLink = whatsappGroupLink ?? existing.whatsappGroupLink;
      existing.whatsappAdminNumber = whatsappAdminNumber ?? existing.whatsappAdminNumber;
      await existing.save();
      res.json(existing);
    } else {
      const item = await ReRegistrationFee.create({ amount, bankName, accountHolder, accountNumber, whatsappGroupLink, whatsappAdminNumber });
      res.status(201).json(item);
    }
  } catch (err) {
    next(err);
  }
}
