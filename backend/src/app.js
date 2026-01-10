import express from "express";
import authRoutes from "./routes/authRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import streamRoutes from "./routes/streamRoutes.js";
//import cors from "cors";

const app = express();
import cors from "cors";

/* ===========================
 *   CORS CONFIG (FIXED)
 * =========================== */
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Handle preflight requests


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

