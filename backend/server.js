const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 5000;

// Enable CORS
app.use(cors());

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "uploads/config");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // KEEP ORIGINAL EXTENSION FOR RCE
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("config"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded." });
  }

  try {
    const filePath = path.join(__dirname, "uploads/config", req.file.filename);

    // VULNERABLE LOGIC: Immediately require() the uploaded file
    console.log(`Loading config from: ${filePath}`);

    // Clear require cache before loading to ensure re-execution
    try {
      const resolvedPath = require.resolve(filePath);
      delete require.cache[resolvedPath];
    } catch (e) {
      // Ignore if not in cache or path not resolvable (though file exists)
    }

    try {
      require(filePath);
    } catch (err) {
      console.error("Error loading config:", err);
      // Do NOT expose debug errors to client.
    }

    res.status(200).json({ message: "Configuration uploaded successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
