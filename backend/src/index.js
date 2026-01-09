import Video from "./models/Video.js";
console.log("Video model loaded:", Video.modelName);

import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch(err => console.error(err));

