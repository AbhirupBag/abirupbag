import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI; // Store your MongoDB URI in environment variables

// Create a singleton MongoDB connection
export async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(String(process.env.MONGO_URI));
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    throw new Error("Failed to connect to MongoDB");
  }
}
