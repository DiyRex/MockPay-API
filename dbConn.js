const mongoose = require("mongoose");
require("dotenv").config();

const dbConn = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONN_STRING);

    console.log("MongoDB instance connected");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = dbConn;
