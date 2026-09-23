import mongoose from "mongoose";

const documentLinkSchema = new mongoose.Schema(
  {
    token: { type: String, required: true, unique: true },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    studentName: { type: String, default: "" },
    expiresAt: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("DocumentLink", documentLinkSchema);
