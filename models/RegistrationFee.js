import mongoose from "mongoose";

const bankAccountSchema = new mongoose.Schema(
  {
    bankName: { type: String, default: "" },
    accountHolder: { type: String, default: "" },
    accountNumber: { type: String, default: "" },
  },
  { _id: true }
);

const registrationFeeSchema = new mongoose.Schema(
  {
    qrisImage: { type: String, default: "" },
    bankAccounts: { type: [bankAccountSchema], default: [] },
    amount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("RegistrationFee", registrationFeeSchema);
