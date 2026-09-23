import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, default: "" },
    text: { type: String, required: true },
    avatar: { type: String, default: "" },
    photoUrl: { type: String, default: "" },
    rating: { type: Number, default: 5, min: 1, max: 5 },
  },
  { timestamps: true }
);

export default mongoose.model("Testimonial", testimonialSchema);
