import mongoose from "mongoose";

const testimonialLinkSchema = new mongoose.Schema(
  {
    token: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("TestimonialLink", testimonialLinkSchema);
