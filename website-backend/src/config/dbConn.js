const mongoose = require('mongoose')

export async function connectDB() {
  const mongoDBUri = "mongodb://127.0.0.1:27017/PersonalWebsite";

  try {
    const conn = await mongoose.connect(mongoDBUri);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(`Failed to connect to MongoDB. ${err}`);
    throw new Error("Database connection failed");
  }
}
