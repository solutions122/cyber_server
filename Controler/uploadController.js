const Document = require("../Model/Document");




const Insert2 = async (req, res) => {
  try {
      const { copies, printType } = req.body;
      const fileUrl = req.file ? `http://localhost:7002/uploads/${req.file.filename}` : null;

      const newDocument = new Document({
          copies,
          printType,
          fileUrl,
          isNew: true, // Mark as new
      });

      const savedDocument = await newDocument.save();

      // Emit event to all connected clients
      req.io.emit("new-document", savedDocument);

      console.log("Inserted Successfully");
      res.json({ message: "Inserted Successfully", document: savedDocument });

  } catch (error) {
      console.error("Error Occurred:", error);
      res.status(500).json({ message: "Internal Server Error" });
  }
};


const View = async (req, res) => {
  try {
      const documents = await Document.find().sort({ createdAt: -1 }); // Sort by newest first
      res.json(documents);
  } catch (error) {
      console.error("Error fetching documents:", error);
      res.status(500).json({ message: "Internal server error" });
  }
};


const MarkAsViewed = async (req, res) => {
  try {
      const { id } = req.params;

      const document = await Document.findById(id);
      if (!document) {
          return res.status(404).json({ message: "Document not found" });
      }

      document.isNew = false; // **Mark file as read**
      await document.save();

      res.json({ message: "File marked as viewed" });

  } catch (error) {
      console.error("Error marking file as viewed:", error);
      res.status(500).json({ message: "Internal Server Error" });
  }
};




// Delete Document
const Delete = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }

    await Document.findByIdAndDelete(req.params.id);
    console.log("Document Deleted Successfully");
    res.json({ success: true, message: "Document deleted" });

  } catch (error) {
    console.error("Error Occurred:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update Document
const Update = async (req, res) => {
  try {
    const { filename, fileUrl, copies, printType, correction, status, documentType } = req.body;
    const updatedData = {};

    if (filename) updatedData.filename = filename;
    if (fileUrl) updatedData.fileUrl = fileUrl;
    if (copies) updatedData.copies = parseInt(copies, 10);
    if (printType) updatedData.printType = printType;
    if (correction) updatedData.correction = correction === "true";
    if (status) updatedData.status = status;
    if (documentType) updatedData.documentType = documentType;

    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }

    const updatedDocument = await Document.findByIdAndUpdate(req.params.id, { $set: updatedData }, { new: true });
    console.log("Document Updated Successfully");
    res.json({ success: true, document: updatedDocument });

  } catch (error) {
    console.error("Error Occurred:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {  View, Delete, Update,Insert2,MarkAsViewed  };
