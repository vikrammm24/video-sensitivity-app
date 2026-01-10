import Register from "./pages/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Upload from "./pages/Upload";
import VideoLibrary from "./pages/VideoLibrary";
import EditorDashboard from "./pages/EditorDashboard";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
	<Route path="/editor" element={<EditorDashboard />} />
	<Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/library" element={<VideoLibrary />} />
      </Routes>
    </BrowserRouter>
  );
}

