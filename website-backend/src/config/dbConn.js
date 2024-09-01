const mongoose = require("mongoose");
require("dotenv").config();

exports.connectDB = async () => {
  const mongoDBUri = process.env.MONGODB_URI;

  try {
    const conn = await mongoose.connect(mongoDBUri);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(`Failed to connect to MongoDB. ${err}`);
    process.exit(1);
  }
};
