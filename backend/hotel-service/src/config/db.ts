import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Define the MongoDB connection URI, using the value from .env or a default fallback
const mongoURI = process.env.MONGO_URI || "mongodb+srv://emilfroding:asd123@scaledb.tql8n.mongodb.net/Hotel-404?retryWrites=true&w=majority&appName=ScaleDb";

// Function to establish a connection to the MongoDB database
const connectHotelDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log(" Hotel-Service connected to MongoDB");
  } catch (error) {
    console.error(" Hotel-Service MongoDB connection error:", error);
    process.exit(1); // Stop the application if the database connection fails
  }
};

// Export the function so it can be used in index.ts
export default connectHotelDB;

