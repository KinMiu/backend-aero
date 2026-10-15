import mongoose from "mongoose";

const documentSettingSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    fileType: { type: String, default: "any", enum: ["any", "image", "pdf"] },
    required: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("DocumentSetting", documentSettingSchema);
