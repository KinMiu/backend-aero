import mongoose from "mongoose";

const visitSchema = new mongoose.Schema(
  {
    sessionId: { type: String, default: "" },
    page: { type: String, default: "/" },
  },
  { timestamps: true }
);

export default mongoose.model("Visit", visitSchema);
