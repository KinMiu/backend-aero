import mongoose from "mongoose";

const videoContentSchema = new mongoose.Schema(
  {
    title: { type: String, default: "" },
    videoData: { type: String, default: "" },
    isActive: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("VideoContent", videoContentSchema);
