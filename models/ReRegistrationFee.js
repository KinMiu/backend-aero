import mongoose from "mongoose";

const reRegistrationFeeSchema = new mongoose.Schema(
  {
    amount: { type: Number, default: 0 },
    bankName: { type: String, default: "" },
    accountHolder: { type: String, default: "" },
    accountNumber: { type: String, default: "" },
    whatsappGroupLink: { type: String, default: "" },
    whatsappAdminNumber: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("ReRegistrationFee", reRegistrationFeeSchema);
