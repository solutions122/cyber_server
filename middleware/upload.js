const multer = require("multer");
const path = require("path");

// Set Storage Engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// File Filter (Allow only specific file types)
const fileFilter = (req, file, cb) => {
    console.log("Uploaded file type:", file.mimetype); // Debugging line
  
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "text/plain"];
  
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"), false);
    }
  };
  

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
});

module.exports = upload;
