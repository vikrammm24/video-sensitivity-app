import { getStreamUrl } from "../controllers/videoController.js";
import express from "express";
import { uploadVideo } from "../controllers/videoController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { allowRoles } from "../middlewares/roleMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post(
  "/upload",
  protect,
  allowRoles("editor", "admin"),
  upload.single("video"),
  uploadVideo
);

router.get(
  "/:id/stream-url",
  protect,
  getStreamUrl
);

export default router;
