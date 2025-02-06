// src/index.js
// för att köra: PS C:\Users\David\Desktop\Skola\WA\hotel-404\backend\src> npx tsx index.ts
import express from "express"; 
import mongoose from "mongoose";
import bookingRouter from "./routes/bookingRouter";
import connectDB from "./config/db";
import cors from 'cors';
import session from "express-session";
import cookieParser from "cookie-parser"; 
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT as string;


declare module 'express-session' {
  export interface SessionData {
    isLoggedIn: boolean, 
    username: string
  }
}

const app = express(); 

app.use(cors({
  origin: "http://localhost:3000", 
  credentials: true
})); 
// Parse incoming JSON request.
app.use(express.json());

app.use(cookieParser()); 

app.set("trust proxy", 1); 
app.use(session({
  secret: 'super-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie:{
    maxAge: 30*60*1000, //store cookies for 30 mins
    sameSite: 'none', 
    secure: true
  }
}));

// Connect to database
connectDB()

// Middleware
app.use((req, _, next) => {
  console.log(req.path, req.method); 
  next(); 
}); 


// routes that booking uses
app.use("/api/booking", bookingRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`); 
}); 
