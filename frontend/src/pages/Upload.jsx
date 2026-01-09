import Navbar from "../components/Navbar";
import { useState } from "react";
import api from "../api/axios";

export default function Upload() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  const uploadVideo = async () => {
    if (!file) {
      alert("Select a video file");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("video", file);

    await api.post("/videos/upload", formData);
    alert("Uploaded");
  };

  return (
    <div>
      <Navbar />
      <h2>Upload Video</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br /><br />

      <input
        type="file"
        accept="video/*"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <button onClick={uploadVideo}>Upload</button>

      <br /><br />

      <a href="/library">Go to Library</a>
    </div>
  );
}
