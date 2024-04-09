const mongoose = require("mongoose");
//! To Connect with the Database.

const connectDB = (MONGODB_URL) => {
  console.log("Successfully connected to the MongooseDB");
  return mongoose.connect(MONGODB_URL);
};

module.exports = connectDB;
