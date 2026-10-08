import mongoose from "mongoose";

const videoSettingSchema = new mongoose.Schema(
  {
    defaultVideoEnabled: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("VideoSetting", videoSettingSchema);
