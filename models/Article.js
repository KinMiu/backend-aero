import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    date: { type: String, default: "" },
    category: { type: String, default: "Uncategorized" },
    image: { type: String, default: "" },
    excerpt: { type: String, default: "" },
    sections: [
      {
        type: { type: String, enum: ["paragraph", "heading", "list", "quote"] },
        text: { type: String, default: "" },
        items: [{ type: String }],
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Article", articleSchema);
