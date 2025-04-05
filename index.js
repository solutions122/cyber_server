// const express = require('express');
// const cors = require('cors');
// const connectToMongoose = require("./database");
// const upload = require("./middleware/upload");
// const fs = require("fs");
// const path = require("path");


// const fileRoutes = require("./Router/upload");

// const app = express();

// app.use(cors({
//     origin: 'http://localhost:5173', // Replace with your frontend's domain
// }));

// connectToMongoose();
// app.use(express.json());

// // Mount only once
// app.use("/api", fileRoutes);

// // Serve uploaded files
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // File upload endpoint
// app.post("/upload", upload.single("document"), (req, res) => {
//     if (!req.file) {
//         return res.status(400).json({ message: "No file uploaded!" });
//     }

//     res.json({
//         message: "File uploaded successfully!",
//         fileUrl: `http://localhost:7002/uploads/${req.file.filename}`,
//     });
// });

// // Get all uploaded files
// app.get("/files", (req, res) => {
//     const uploadDir = path.join(__dirname, "uploads");

//     if (!fs.existsSync(uploadDir)) {
//         return res.status(404).json({ message: "Uploads folder not found" });
//     }

//     fs.readdir(uploadDir, (err, files) => {
//         if (err) {
//             console.error("Error reading uploads folder:", err);
//             return res.status(500).json({ message: "Error reading files" });
//         }

//         const fileList = files.map((file) => ({
//             name: file,
//             url: `http://localhost:7002/uploads/${file}`,
//         }));

//         res.json(fileList);
//     });
// });

// // Serve uploaded file manually if needed
// app.get("/uploads/:filename", (req, res) => {
//     const filePath = path.join(__dirname, "uploads", req.params.filename);

//     if (!fs.existsSync(filePath)) {
//         return res.status(404).json({ message: "File not found!" });
//     }

//     res.sendFile(filePath);
// });

// const PORT = process.env.PORT || 7002;
// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });


const express = require("express");
const http = require("http"); // Import HTTP module
const cors = require("cors");
const connectToMongoose = require("./database");
const uploadRoutes = require("./Router/upload");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app); // Create HTTP server
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // Replace with your frontend domain
        methods: ["GET", "POST"],
    },
});

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectToMongoose();

// Serve uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Mount routes
app.use("/api", (req, res, next) => {
    req.io = io; // Attach Socket.IO instance to request
    next();
}, uploadRoutes);

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
    
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

const PORT = process.env.PORT || 7002;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
