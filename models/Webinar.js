import mongoose from "mongoose";

const webinarSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    description: { type: String, default: "" },
    waLink: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
    fields: [
      {
        label: { type: String, required: true },
        type: { type: String, default: "text" },
        required: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Webinar", webinarSchema);
