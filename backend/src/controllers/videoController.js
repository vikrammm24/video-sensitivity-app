import Video from "../models/Video.js";
import { processVideo } from "../utils/videoProcessor.js";
import jwt from "jsonwebtoken";

// ✅ Upload video
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

    const io = req.app.get("io");
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

// ✅ Generate signed streaming URL (AUTHORIZED)
export const getStreamUrl = async (req, res) => {
  try {
    const { id } = req.params;

    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    const streamToken = jwt.sign(
      { videoId: id, userId: req.user.id },
      process.env.JWT_SECRET,
      { expiresIn: "5m" }
    );

    res.json({
      streamUrl: `http://localhost:5000/api/stream/${id}?token=${streamToken}`
    });
  } catch (err) {
    res.status(500).json({ message: "Could not generate stream URL" });
  }
};

// ✅ Get all videos uploaded by logged-in user
export const getUserVideos = async (req, res) => {
  try {
    const videos = await Video.find({ uploadedBy: req.user.id })
      .sort({ createdAt: -1 });

    res.json(videos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch videos" });
  }
};
// ===========================
// EDITOR: GET ALL VIDEOS
// ===========================
export const getAllVideos = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) {
      filter.status = req.query.status;
    }

    const videos = await Video.find(filter)
      .populate("uploadedBy", "name email role")
      .sort({ createdAt: -1 });

    res.json(videos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch all videos" });
  }
};

// ===========================
// EDITOR: ACCEPT / REJECT VIDEO
// ===========================
export const updateVideoStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["safe", "flagged"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    video.status = status;
    await video.save();

    res.json({
      message: "Video status updated",
      video,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update video status" });
  }
};
