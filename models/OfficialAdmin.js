import mongoose from "mongoose";

const officialAdminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, default: "" },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("OfficialAdmin", officialAdminSchema);
