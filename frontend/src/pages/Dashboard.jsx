import { useState } from "react";
import api from "../api/axios";

export default function Dashboard() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");

  const upload = async () => {
    const form = new FormData();
    form.append("title", title);
    form.append("video", file);

    await api.post("/videos/upload", form);
    alert("Uploaded!");
  };
<a href="/library">📚 Go to Video Library</a>

  return (
    <div>
      <h2>Upload Video</h2>
      <input placeholder="Title" onChange={e => setTitle(e.target.value)} />
      <input type="file" accept="video/*" onChange={e => setFile(e.target.files[0])} />
      <button onClick={upload}>Upload</button>
    </div>
  );
}
