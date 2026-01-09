import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/videos");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  console.log("UPLOAD DEBUG →", {
    originalname: file.originalname,
    mimetype: file.mimetype
  });

  const ext = path.extname(file.originalname).toLowerCase();
  const allowedExt = [".mp4", ".mkv", ".avi"];

  if (allowedExt.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only video files are allowed"));
  }
};


export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 100 * 1024 * 1024 }
});

