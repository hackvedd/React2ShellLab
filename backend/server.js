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
    // SECURE FILENAME GENERATION
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("config"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded." });
  }

  // Sanitization & Validation
  const allowedExtensions = [".json", ".txt", ".zip"];
  const fileExt = path.extname(req.file.originalname).toLowerCase();

  if (!allowedExtensions.includes(fileExt)) {
    // Delete the potentially dangerous file
    try {
      fs.unlinkSync(req.file.path);
    } catch (e) {}
    return res
      .status(400)
      .json({ message: "Invalid file type. Protocol breach detected." });
  }

  try {
    const fileName = path.basename(req.file.filename); // Prevent path traversal
    console.log(`Resource registered: ${fileName}`);

    // SECURE LOGIC: Do not use require() or eval() on user content.
    // Instead, just verify the file exists or process it as data.
    if (fs.existsSync(req.file.path)) {
      // Log metadata securely
      const stats = fs.statSync(req.file.path);
      console.log(`Vault integrity verified: ${stats.size} bytes`);
    }

    res.status(200).json({ message: "Configuration uploaded successfully." });
  } catch (error) {
    console.error("Cryptographic error:", error);
    res.status(500).json({ message: "System failure during vault injection." });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
