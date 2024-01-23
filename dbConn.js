const mongoose = require("mongoose");
require("dotenv").config();

const dbConn = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONN_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Add any additional options as needed
    });

    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1); // Exit the process with an error
  }
};

module.exports = dbConn;
