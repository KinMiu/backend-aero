import mongoose from "mongoose";

const uploadedDocumentSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    fileName: { type: String, required: true },
    fileType: { type: String, default: "" },
    filePath: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("UploadedDocument", uploadedDocumentSchema);
