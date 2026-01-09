import streamRoutes from "./routes/streamRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import { protect } from "./middlewares/authMiddleware.js";
import { allowRoles } from "./middlewares/roleMiddleware.js";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.get(
  "/api/editor-only",
  protect,
  allowRoles("editor", "admin"),
  (req, res) => {
    res.json({ message: "Editor access granted" });
  }
);

app.get("/api/protected", protect, (req, res) => {
  res.json({ message: "Access granted", user: req.user });
});

app.use("/api/videos", videoRoutes);


app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API running");
});

app.use("/api/stream", streamRoutes);

export default app;

