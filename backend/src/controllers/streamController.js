import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import Video from "../models/Video.js";

export const streamVideo = async (req, res) => {

const { id } = req.params;
  const { token } = req.query;

  if (!token) {
    return res.status(401).json({ message: "Stream token required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Optional: enforce ownership
    if (decoded.videoId !== id) {
      return res.status(403).json({ message: "Invalid stream token" });
    }

  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired stream token" });
  }
  const videoId = req.params.id;

  const video = await Video.findById(videoId);
  if (!video) {
    return res.status(404).json({ message: "Video not found" });
  }

  const videoPath = path.resolve(video.filepath);
  const videoSize = fs.statSync(videoPath).size;
  const range = req.headers.range;

 if (!range) {
  // Fallback for non-range clients
  res.setHeader("Content-Type", "video/mp4");
  return fs.createReadStream(videoPath).pipe(res);
 }

  const CHUNK_SIZE = 10 ** 6; // 1MB
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": end - start + 1,
    "Content-Type": "video/mp4"
  };

  res.writeHead(206, headers);

  const stream = fs.createReadStream(videoPath, { start, end });
  stream.pipe(res);
};
