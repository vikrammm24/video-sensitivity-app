import express from "express";
import { streamVideo } from "../controllers/streamController.js";
import protect from "../middlewares/authMiddleware.js";


const router = express.Router();

router.get("/:id", streamVideo);

export default router;
