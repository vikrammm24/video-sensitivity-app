import express from "express";
import { uploadVideo, getStreamUrl, getUserVideos } from "../controllers/videoController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// 🔹 Get all videos of logged-in user (VIDEO LIBRARY)
router.get("/", protect, getUserVideos);

// 🔹 Upload video
router.post("/upload", protect, upload.single("video"), uploadVideo);

// 🔹 Get authorized streaming URL
router.get("/:id/stream-url", protect, getStreamUrl);

export default router;

