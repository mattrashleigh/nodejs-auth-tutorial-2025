"use strict";

const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("MongoDB Connection failed");
    process.exit(1);
  }
};

module.exports = connectToDB;
