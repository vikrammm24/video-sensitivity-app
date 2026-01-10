import express from "express";
import upload from "../middlewares/uploadMiddleware.js";
import protect from "../middlewares/authMiddleware.js";
import editorOnly from "../middlewares/editorOnly.js";

import {
  uploadVideo,
  getStreamUrl,
  getUserVideos,
  getAllVideos,
  updateVideoStatus,
} from "../controllers/videoController.js";

const router = express.Router();

/* ===========================
   EDITOR ROUTES (FIRST)
=========================== */
router.get("/all", protect, editorOnly, getAllVideos);
router.patch("/:id/status", protect, editorOnly, updateVideoStatus);

/* ===========================
   USER ROUTES
=========================== */
router.post("/upload", protect, upload.single("video"), uploadVideo);
router.get("/", protect, getUserVideos);
router.get("/:id/stream-url", protect, getStreamUrl);

export default router;

