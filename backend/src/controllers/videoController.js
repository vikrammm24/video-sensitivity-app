import jwt from "jsonwebtoken";
import Video from "../models/Video.js";
import { processVideo } from "../utils/videoProcessor.js";

export const getStreamUrl = async (req, res) => {
  const { id } = req.params;

  // Ensure video exists
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).json({ message: "Video not found" });
  }

  // 🔐 Short-lived token (5 minutes)
  const streamToken = jwt.sign(
    {
      videoId: id,
      userId: req.user.id
    },
    process.env.JWT_SECRET,
    { expiresIn: "5m" }
  );

  res.json({
    streamUrl: `http://localhost:5000/api/stream/${id}?token=${streamToken}`
  });
};

export const uploadVideo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No video file uploaded" });
    }

    const video = await Video.create({
      title: req.body.title,
      filename: req.file.filename,
      filepath: req.file.path,
      uploadedBy: req.user.id,
      status: "uploaded"
    });

    // 🔑 IMPORTANT: get io instance
    const io = req.app.get("io");

    // 🔥 Start processing in background
    processVideo(video._id.toString(), io);

    res.status(201).json({
      message: "Video uploaded successfully",
      video
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Video upload failed" });
  }
};

