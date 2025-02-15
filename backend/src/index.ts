// src/index.js
// för att köra: PS C:\Users\David\Desktop\Skola\WA\hotel-404\backend\src> npx tsx index.ts
import express from "express"; 
import mongoose from "mongoose";
//import {hotelRouter} from "../hotel-service/src/routes/hotelRoutes"; 
import userRouter from "../user-service/src/routes/userRoutes"; 
import bookingRouter from "./Routers/bookingRouter";
import cors from 'cors';
import session from "express-session";
import cookieParser from "cookie-parser"; 
import dotenv from "dotenv";

dotenv.config();

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
    secure: false
  }
}));


const mongoURI = 'mongodb+srv://emilfroding:asd123@scaledb.tql8n.mongodb.net/Hotel-404?retryWrites=true&w=majority&appName=ScaleDb'

mongoose.connect(mongoURI, {
  serverSelectionTimeoutMS: 30000,
})
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

//app.use("/api/hotels", hotelRouter); 
app.use("/api/user", userRouter);
app.use("/api/booking", bookingRouter);


app.use((req, _, next) => {
  console.log(req.path, req.method); 
  next(); 
}); 


// Start server
const PORT = process.env.PORT || 7700;
app.listen(PORT, () => {
  console.log(`Backend-Service Listening on port ${PORT}`);
});