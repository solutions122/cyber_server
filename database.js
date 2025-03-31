const mongoose = require("mongoose");

// Correctly assign the connection string to the variable
const mongourl = "mongodb+srv://cybersolutionscenter1:solutions%402024@cluster0.xp6we.mongodb.net/matrimonydb2?retryWrites=true&w=majority&appName=Cluster0";

const connectToMongo = async () => {
  try {
    // Use the variable in the connect method
    await mongoose.connect(mongourl);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = connectToMongo;
