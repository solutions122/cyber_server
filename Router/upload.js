const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload"); 
const { View, Insert2, Delete, MarkAsViewed } = require("../Controler/uploadController");

router.get("/view", View);
router.post("/insert", upload.single("document"), Insert2);
router.delete("/delete/:id", Delete);

// **New Route: Mark file as viewed**
router.put("/mark-viewed/:id", MarkAsViewed);

module.exports = router;
