import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const DB_URI = process.env.DB_URI as string;

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("Booking service is Connected to MongoDB Atlas");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit the process if connection fails
  }
};

export default connectDB;
