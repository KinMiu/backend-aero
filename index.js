import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { connectDB } from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

import authRoutes from "./routes/authRoutes.js";
import officialRoutes from "./routes/officialRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import openRegistrationRoutes from "./routes/openRegistrationRoutes.js";
import articleRoutes from "./routes/articleRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";
import testimonialLinkRoutes from "./routes/testimonialLinkRoutes.js";
import documentLinkRoutes from "./routes/documentLinkRoutes.js";
import uploadedDocumentRoutes from "./routes/uploadedDocumentRoutes.js";
import visitRoutes from "./routes/visitRoutes.js";
import adPosterRoutes from "./routes/adPosterRoutes.js";
import videoContentRoutes from "./routes/videoContentRoutes.js";
import videoSettingRoutes from "./routes/videoSettingRoutes.js";
import webinarRoutes from "./routes/webinarRoutes.js";
import documentSettingRoutes from "./routes/documentSettingRoutes.js";
import registrationFeeRoutes from "./routes/registrationFeeRoutes.js";
import reRegistrationFeeRoutes from "./routes/reRegistrationFeeRoutes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/auth", authRoutes);
app.use("/api/officials", officialRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/open-registrations", openRegistrationRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/testimonial-links", testimonialLinkRoutes);
app.use("/api/document-links", documentLinkRoutes);
app.use("/api/documents", uploadedDocumentRoutes);
app.use("/api/visits", visitRoutes);
app.use("/api/ad-posters", adPosterRoutes);
app.use("/api/video-content", videoContentRoutes);
app.use("/api/video-settings", videoSettingRoutes);
app.use("/api/webinars", webinarRoutes);
app.use("/api/document-settings", documentSettingRoutes);
app.use("/api/registration-fee", registrationFeeRoutes);
app.use("/api/re-registration-fee", reRegistrationFeeRoutes);

app.use(notFound);
app.use(errorHandler);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
