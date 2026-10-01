import mongoose from "mongoose";

const adPosterSchema = new mongoose.Schema(
  {
    images: { type: [String], required: true, default: [] },
    title: { type: String, required: true },
    startsAt: { type: Date, required: true },
    endsAt: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("AdPoster", adPosterSchema);
