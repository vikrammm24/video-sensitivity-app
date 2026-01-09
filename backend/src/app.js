import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import streamRoutes from "./routes/streamRoutes.js";

const app = express();

/**
 * ✅ CORS configuration
 * Express 5 compatible
 * Allows frontend (Vite) to access backend APIs
 */
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

/**
 * ✅ Body parsing
 */
app.use(express.json());

/**
 * ✅ Routes
 */
app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/stream", streamRoutes);

/**
 * ✅ Health check
 */
app.get("/", (req, res) => {
  res.send("API running");
});

export default app;

