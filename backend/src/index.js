import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";
import app from "./app.js";

const server = http.createServer(app);

// ✅ CREATE SOCKET.IO INSTANCE
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173"
  }
});

// ✅ THIS LINE IS CRITICAL (YOU WERE MISSING THIS)
app.set("io", io);

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    server.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch((err) => console.error(err));


