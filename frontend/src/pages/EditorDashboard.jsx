import { useEffect, useState } from "react";
import api from "../api/axios";

export default function EditorDashboard() {
  const [videos, setVideos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const url =
        filter === "all"
          ? "/videos/all"
          : `/videos/all?status=${filter}`;

      const res = await api.get(url);
      setVideos(res.data);
    } catch (err) {
      console.error("Failed to fetch videos", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [filter]);

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/videos/${id}/status`, { status });
      fetchVideos();
    } catch (err) {
      console.error("STATUS UPDATE ERROR:", err.response?.data || err.message);
      alert(
        err.response?.data?.message ||
        "Failed to update status"
      );
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const getStatusColor = (status) => {
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
        return "⏳ Pending Review";
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-[20px] bg-black/40 border-b border-white/10 shadow-premium">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-premium-accent to-premium-light flex items-center justify-center">
              <span className="text-white font-bold">✓</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Moderation Panel</h1>
              <p className="text-xs text-white/60">Content Review Dashboard</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="btn-secondary px-6 py-2 text-sm"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Filter Section */}
          <div className="mb-10 animate-fade-in">
            <h2 className="text-3xl font-bold mb-6">Review Queue</h2>
            <div className="flex flex-wrap gap-3">
              {[
                { value: "all", label: "All Videos" },
                { value: "uploaded", label: "Pending Review" },
                { value: "safe", label: "Approved" },
                { value: "flagged", label: "Flagged" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFilter(option.value)}
                  className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                    filter === option.value
                      ? "btn-primary"
                      : "btn-secondary"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="inline-block w-12 h-12 rounded-full border-2 border-white/20 border-t-premium-accent animate-spin mb-4"></div>
                <p className="text-white/60">Loading videos...</p>
              </div>
            </div>
          ) : videos.length === 0 ? (
            <div className="premium-card text-center py-16 animate-fade-in">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold mb-2">Queue Empty</h3>
              <p className="text-white/60">All videos have been moderated!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {videos.map((video) => (
                <div
                  key={video._id}
                  className="premium-card group animate-slide-in"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    {/* Video Info */}
                    <div className="flex gap-6 flex-1 min-w-0">
                      {/* Thumbnail */}
                      <div className="flex-shrink-0">
                        <div className="w-24 h-24 rounded-xl bg-black/40 flex items-center justify-center text-3xl">
                          🎥
                        </div>
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="mb-2">
                          <h3 className="font-semibold text-white text-lg truncate group-hover:text-premium-lighter transition-colors">
                            {video.title}
                          </h3>
                          <p className="text-xs text-white/50 mt-1">
                            ID: {video._id.slice(0, 12)}...
                          </p>
                        </div>

                        <div className="space-y-2">
                          <p className="text-sm text-white/70">
                            <span className="font-semibold">Uploaded by:</span>{" "}
                            {video.uploadedBy?.name || "Unknown"}
                          </p>
                          <p className="text-xs text-white/60">
                            {video.uploadedBy?.email}
                          </p>
                          <p className="text-xs text-white/50 mt-2">
                            {new Date(video.createdAt).toLocaleString()}
                          </p>
                        </div>

                        {/* Status Badge */}
                        <div className="mt-3">
                          <span className={`${getStatusColor(video.status)}`}>
                            {getStatusLabel(video.status)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 lg:flex-col xl:flex-row lg:flex-shrink-0">
                      <button
                        onClick={() => updateStatus(video._id, "safe")}
                        disabled={video.status === "safe"}
                        className="btn-accent flex-1 lg:flex-none disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        ✓ Approve
                      </button>

                      <button
                        onClick={() => updateStatus(video._id, "flagged")}
                        disabled={video.status === "flagged"}
                        className="btn-danger flex-1 lg:flex-none disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        ✕ Flag
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Stats */}
          {!loading && videos.length > 0 && (
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  label: "Total in View",
                  value: videos.length,
                  color: "premium-light",
                },
                {
                  label: "Safe",
                  value: videos.filter((v) => v.status === "safe").length,
                  color: "status-safe",
                },
                {
                  label: "Flagged",
                  value: videos.filter((v) => v.status === "flagged").length,
                  color: "status-flagged",
                },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="glass-panel-sm p-6 text-center animate-fade-in"
                >
                  <p className="text-white/60 text-sm mb-2">{stat.label}</p>
                  <p className={`text-3xl font-bold text-${stat.color}`}>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
