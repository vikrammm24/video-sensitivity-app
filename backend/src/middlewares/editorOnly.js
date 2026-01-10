const editorOnly = (req, res, next) => {
  if (req.user.role !== "editor") {
    return res.status(403).json({ message: "Editor access required" });
  }
  next();
};

export default editorOnly;
