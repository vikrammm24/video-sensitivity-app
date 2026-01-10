import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import api from "../api/axios";
import VideoPlayer from "../components/VideoPlayer";

export default function VideoLibrary() {
  const [videos, setVideos] = useState([]);
  const [playingId, setPlayingId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await api.get("/videos");
        setVideos(res.data);
      } catch (err) {
        console.error("Failed to fetch videos", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "safe":
        return "status-safe";
      case "flagged":
        return "status-flagged";
      case "uploaded":
        return "status-pending";
      default:
        return "status-pending";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "safe":
        return "✅ Safe";
      case "flagged":
        return "🚫 Flagged";
      case "uploaded":
        return "⏳ Processing";
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12 animate-fade-in">
            <h1 className="text-5xl font-bold mb-2">My Videos</h1>
            <p className="text-white/60">Manage and watch your uploaded videos</p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="inline-block w-12 h-12 rounded-full border-2 border-white/20 border-t-premium-accent animate-spin mb-4"></div>
                <p className="text-white/60">Loading your videos...</p>
              </div>
            </div>
          ) : videos.length === 0 ? (
            <div className="premium-card text-center py-12 animate-fade-in">
              <div className="text-4xl mb-4">🎬</div>
              <h3 className="text-xl font-semibold mb-2">No Videos Yet</h3>
              <p className="text-white/60 mb-6">Start by uploading your first video</p>
              <a href="/upload" className="btn-primary inline-block">
                Upload Video
              </a>
            </div>
          ) : (
            <>
              {/* Video Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {videos.map((video) => (
                  <div
                    key={video._id}
                    className="premium-card group cursor-pointer animate-fade-in"
                  >
                    {/* Video Thumbnail */}
                    <div className="relative mb-4 rounded-lg overflow-hidden bg-black/40 aspect-video flex items-center justify-center group-hover:bg-black/60 transition-all">
                      <span className="text-4xl">🎥</span>
                      {video.status === "safe" && (
                        <div className="absolute top-3 right-3">
                          <span className="status-safe">Safe</span>
                        </div>
                      )}
                    </div>

                    {/* Video Info */}
                    <div className="space-y-3">
                      <h3 className="font-semibold text-white line-clamp-2 group-hover:text-premium-lighter transition-colors">
                        {video.title}
                      </h3>

                      {/* Status Badge */}
                      <div className="flex items-center justify-between">
                        <span className={getStatusBadgeClass(video.status)}>
                          {getStatusLabel(video.status)}
                        </span>
                      </div>

                      {/* Uploader Info */}
                      <p className="text-xs text-white/50">
                        {new Date(video.createdAt).toLocaleDateString()}
                      </p>

                      {/* Action Button */}
                      {video.status === "safe" && (
                        <button
                          onClick={() => setPlayingId(video._id)}
                          className="btn-accent w-full text-sm py-2"
                        >
                          ▶ Play Video
                        </button>
                      )}
                      {video.status === "flagged" && (
                        <div className="text-xs text-status-flagged bg-status-flagged/10 p-2 rounded-lg text-center">
                          Content flagged - not available
                        </div>
                      )}
                      {video.status === "uploaded" && (
                        <div className="text-xs text-status-pending bg-status-pending/10 p-2 rounded-lg text-center">
                          Being processed...
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Video Player Modal */}
          {playingId && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="w-full max-w-4xl animate-fade-in">
                <div className="premium-card relative">
                  <button
                    onClick={() => setPlayingId(null)}
                    className="absolute -top-12 right-0 text-white/60 hover:text-white transition-colors text-2xl font-bold"
                  >
                    ✕
                  </button>

                  <VideoPlayer videoId={playingId} />

                  <button
                    onClick={() => setPlayingId(null)}
                    className="btn-secondary w-full mt-4"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
