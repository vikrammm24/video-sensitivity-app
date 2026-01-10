import Navbar from "../components/Navbar";
import { useState } from "react";
import api from "../api/axios";

export default function Upload() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const uploadVideo = async () => {
    if (!title.trim()) {
      alert("Please enter a title");
      return;
    }

    if (!file) {
      alert("Please select a video file");
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("video", file);

      const response = await api.post("/videos/upload", formData, {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(progress);
        },
      });

      if (response.status === 200 || response.status === 201) {
        setTimeout(() => {
          window.location.href = "/library";
        }, 1000);
      }
    } catch (error) {
      alert("Upload failed: " + (error.response?.data?.message || error.message));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 px-6 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-12 animate-fade-in">
            <h1 className="text-5xl font-bold mb-2">Upload Video</h1>
            <p className="text-white/60">Share your content with our platform</p>
          </div>

          {/* Upload Card */}
          <div className="premium-card space-y-8">
            {/* Title Input */}
            <div>
              <label className="block text-sm font-semibold text-white/70 mb-3 uppercase tracking-wide">
                Video Title
              </label>
              <input
                type="text"
                placeholder="Enter an engaging title..."
                className="form-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={uploading}
              />
            </div>

            {/* Drag & Drop Area */}
            <div>
              <label className="block text-sm font-semibold text-white/70 mb-3 uppercase tracking-wide">
                Video File
              </label>
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-2xl p-12 transition-all duration-300 cursor-pointer ${
                  dragActive
                    ? "border-premium-accent bg-premium-accent/10"
                    : "border-white/20 bg-black/20 hover:border-white/40"
                }`}
              >
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => setFile(e.target.files?.[0])}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  disabled={uploading}
                />

                <div className="text-center">
                  <div className="text-5xl mb-4">🎬</div>
                  {file ? (
                    <>
                      <p className="text-white font-semibold mb-2">
                        {file.name}
                      </p>
                      <p className="text-white/60 text-sm">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                      <p className="text-premium-light text-sm mt-3 font-medium">
                        Click to change
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-white font-semibold mb-2">
                        Drop your video here or click to select
                      </p>
                      <p className="text-white/60 text-sm">
                        Supported formats: MP4, WebM, MKV, AVI (up to 500MB)
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Upload Progress */}
            {uploading && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-white">Uploading...</p>
                  <p className="text-sm text-white/60">{uploadProgress}%</p>
                </div>
                <div className="w-full h-2 bg-black/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-premium-accent to-premium-light transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={uploadVideo}
                disabled={uploading || !file || !title.trim()}
                className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? "Uploading..." : "Upload Video"}
              </button>
              <a
                href="/library"
                className="flex-1 btn-secondary flex items-center justify-center disabled:opacity-50"
              >
                Cancel
              </a>
            </div>

            {/* Info Section */}
            <div className="glass-panel-sm p-4 space-y-2 border-l-4 border-premium-light">
              <p className="text-xs font-semibold text-white/70 uppercase">Tips:</p>
              <ul className="text-xs text-white/60 space-y-1">
                <li>• Keep titles concise and descriptive</li>
                <li>• Videos will be moderated by our team</li>
                <li>• You'll be notified when moderation is complete</li>
                <li>• Safe videos can be watched immediately</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
