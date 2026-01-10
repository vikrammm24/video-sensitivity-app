import { useEffect, useState } from "react";
import api from "../api/axios";

export default function EditorDashboard() {
  const [videos, setVideos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);

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


  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <h1 className="text-2xl font-semibold mb-4">
        Editor Moderation Dashboard
      </h1>

      {/* Filter */}
      <div className="mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">All</option>
          <option value="uploaded">Uploaded</option>
          <option value="safe">Safe</option>
          <option value="flagged">Flagged</option>
        </select>
      </div>

      {loading && <p>Loading...</p>}

      {/* Video Cards */}
      <div className="grid gap-4">
        {videos.map((v) => (
          <div
            key={v._id}
            className="bg-white p-4 rounded shadow"
          >
            <div className="flex justify-between">
              <div>
                <p className="font-semibold">{v.title}</p>
                <p className="text-sm text-gray-500">
                  Uploaded by {v.uploadedBy?.name} (
                  {v.uploadedBy?.email})
                </p>
              </div>

              <span
                className={`px-3 py-1 rounded text-sm ${
                  v.status === "safe"
                    ? "bg-green-100 text-green-700"
                    : v.status === "flagged"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {v.status}
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => updateStatus(v._id, "safe")}
                className="px-4 py-1 bg-green-600 text-white rounded"
                disabled={v.status === "safe"}
              >
                Accept
              </button>

              <button
                onClick={() => updateStatus(v._id, "flagged")}
                className="px-4 py-1 bg-red-600 text-white rounded"
                disabled={v.status === "flagged"}
              >
                Reject
              </button>
            </div>
          </div>
        ))}

        {!loading && videos.length === 0 && (
          <p>No videos found</p>
        )}
      </div>
    </div>
  );
}

