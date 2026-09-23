import mongoose from "mongoose";

const openRegistrationSchema = new mongoose.Schema(
  {
    month: { type: String, required: true },
    year: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("OpenRegistration", openRegistrationSchema);
