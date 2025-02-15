import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();


// Define the MongoDB connection URI
const mongoURI = 'mongodb+srv://emilfroding:asd123@scaledb.tql8n.mongodb.net/Hotel-404?retryWrites=true&w=majority&appName=ScaleDb';


// Function to establish a connection to the MongoDB database
const connectHotelDB = async () => {
  try {
    console.log("🌍 Connecting to MongoDB:", mongoURI);

    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 30000, // Vänta längre innan timeout
      socketTimeoutMS: 45000 // Vänta längre på svar
    });

    console.log("✅ Hotel-Service connected to MongoDB");
  } catch (error: unknown) {
    if (error instanceof Error) {  // Kontrollera om det är ett Error-objekt
      console.error("❌ Hotel-Service MongoDB connection error:", error.message);
      console.error("Stack trace:", error.stack); // Visa stack trace för bättre felsökning
    } else {
      console.error("❌ Unknown error occurred:", error);  // Om det inte är ett Error-objekt
    }
    process.exit(1); // Stoppa applikationen vid anslutningsfel
  }
};

// Event listeners for debugging
mongoose.connection.on("connected", () => {
  console.log("✅ Mongoose connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("⚠️ Mongoose disconnected from MongoDB");
});

// Export the function so it can be used in index.ts
export default connectHotelDB;



