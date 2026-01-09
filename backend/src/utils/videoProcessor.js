import Video from "../models/Video.js";

export const processVideo = async (videoId, io) => {
  try {
    console.log("Processing started for:", videoId);

    // 1️⃣ Mark as processing
    await Video.findByIdAndUpdate(videoId, { status: "processing" });
    io.emit("video-status", { videoId, status: "processing" });

    // 2️⃣ Fake progress
    for (let progress = 20; progress <= 100; progress += 20) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      io.emit("video-progress", { videoId, progress });
    }

    // 3️⃣ Fake sensitivity result
    const isSafe = Math.random() > 0.3;

    await Video.findByIdAndUpdate(videoId, {
      status: isSafe ? "safe" : "flagged"
    });

    io.emit("video-status", {
      videoId,
      status: isSafe ? "safe" : "flagged"
    });

    console.log("Processing finished for:", videoId);

  } catch (err) {
    console.error("Processing error:", err);
    await Video.findByIdAndUpdate(videoId, { status: "flagged" });
  }
};

