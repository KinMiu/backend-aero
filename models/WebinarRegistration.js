import mongoose from "mongoose";

const webinarRegistrationSchema = new mongoose.Schema(
  {
    webinarId: { type: mongoose.Schema.Types.ObjectId, ref: "Webinar", required: true },
    data: { type: Map, of: String, default: {} },
  },
  { timestamps: true }
);

export default mongoose.model("WebinarRegistration", webinarRegistrationSchema);
