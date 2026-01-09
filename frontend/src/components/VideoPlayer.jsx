import { useEffect, useState } from "react";
import api from "../api/axios";

export default function VideoPlayer({ videoId }) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    api.get(`/videos/${videoId}/stream-url`)
      .then(res => setUrl(res.data.streamUrl));
  }, [videoId]);

  if (!url) return null;

  return (
    <video controls width="600">
      <source src={url} type="video/mp4" />
    </video>
  );
}
