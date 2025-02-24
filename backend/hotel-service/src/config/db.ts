import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config(); 

const connectHotelDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI as string);
    console.log("Hotel-service is connected to MongoDB Atlas");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit the process if connection fails
  }
};

export { connectHotelDB };