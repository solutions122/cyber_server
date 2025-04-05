const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema({
    name: { type: String, required: false },
    email: { type: String, required: false },
    copies: { type: Number, required: false },
    printType: { type: String, required: false },
    fileUrl: { type: String, required: false },
    isNew: { type: Boolean, default: true }, // **New field to track new files**
}, { timestamps: true });

module.exports = mongoose.model("Document", DocumentSchema);
