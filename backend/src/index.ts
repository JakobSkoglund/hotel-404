// src/index.js
// för att köra: PS C:\Users\David\Desktop\Skola\WA\hotel-404\backend\src> npx tsx index.ts
import express from "express"; 
import mongoose from "mongoose";
import hotelRouter from "../hotel-service/src/routes/hotelRoutes"; 
import userRouter from "../user-service/src/routes/userRoutes"; 
import bookingRouter from "../booking-service/routes/bookingRouter";
import cors from 'cors';
import session from "express-session";
import cookieParser from "cookie-parser";
import { createProxyMiddleware } from "http-proxy-middleware";


import dotenv from "dotenv";

dotenv.config();

declare module 'express-session' {
  export interface SessionData {
    isLoggedIn: boolean, 
    username: string
  }
}

//Define custom environment variable for ProcessEnv
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_CONNECTION_STRING: string; 
    }
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

// Load the .env variables
const mongoURI: string = process.env.DB_URI as string;
const API_GATEWAY_PORT = process.env.API_GATEWAY_PORT as string;
const USER_SERVICE_PORT = process.env.USER_SERVICE_PORT as string;
const BOOKING_SERVICE_PORT = process.env.BOOKING_SERVICE_PORT as string;
const HOTEL_SERVICE_PORT = process.env.HOTEL_SERVICE_PORT as string;

// Print out the loaded variables
console.log(`mongoURI = ${mongoURI}`);
console.log(`API_GATEWAY_PORT = ${API_GATEWAY_PORT}`);
console.log(`USER_SERVICE_PORT = ${USER_SERVICE_PORT}`);
console.log(`BOOKING_SERVICE_PORT = ${BOOKING_SERVICE_PORT}`);
console.log(`HOTEL_SERVICE_PORT = ${HOTEL_SERVICE_PORT}`);

/* 
mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
 */
 
// Proxy the user routes
app.use("/api/user", createProxyMiddleware({
  target: `http://localhost:${USER_SERVICE_PORT}`, // Forward to the user service
  changeOrigin: true, // Change the origin of the request to the target server
}));

// Forward requests to Booking Service
app.use("/api/booking", createProxyMiddleware({ target: `http://localhost:${BOOKING_SERVICE_PORT}`, changeOrigin: true }));

// Forward requests to Hotel Service
app.use("/api/hotels", createProxyMiddleware({ target: `http://localhost:${HOTEL_SERVICE_PORT}`, changeOrigin: true }));

/* 
app.use("/api/hotels", hotelRouter); 
app.use("/api/user", userRouter);
app.use("/api/booking", bookingRouter); */


app.use((req, _, next) => {
  console.log(req.path, req.method); 
  next(); 
}); 


// Start server
app.listen(API_GATEWAY_PORT, () => {
  console.log(`Listening on port ${API_GATEWAY_PORT}`); 
}); 
