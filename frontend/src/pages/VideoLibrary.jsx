import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import api from "../api/axios";
import VideoPlayer from "../components/VideoPlayer";

export default function VideoLibrary() {
  const [videos, setVideos] = useState([]);
  const [playingId, setPlayingId] = useState(null);

  useEffect(() => {
    api.get("/videos")
      .then(res => setVideos(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <Navbar />
      <h2>My Videos</h2>

      {videos.length === 0 && <p>No videos uploaded yet</p>}

      {videos.map(video => (
        <div key={video._id} style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}>
          <p><b>Title:</b> {video.title}</p>
          <p>
            <b>Status:</b>{" "}
            {video.status === "safe" && "✅ Safe"}
            {video.status === "flagged" && "🚫 Flagged"}
            {video.status === "uploaded" && "⏳ Processing"}
          </p>

          {video.status === "safe" && (
            <button onClick={() => setPlayingId(video._id)}>
              ▶ Play
            </button>
          )}
        </div>
      ))}

      {playingId && (
        <>
          <h3>Now Playing</h3>
          <VideoPlayer videoId={playingId} />
        </>
      )}
    </div>
  );
}
