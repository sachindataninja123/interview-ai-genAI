const mongoose = require("mongoose");
const config = require("../config/config");

const connectToDb = async () => {
  try {
    await mongoose.connect(config.MONGO_URL);
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database connection error", error);
  }
};

module.exports = connectToDb;
