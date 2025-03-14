import express from "express";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectHotelDB } from "./config/db";
import hotelRouter from "./routes/hotelRoutes";
import healthRouter from "./routes/health";

// Load .env variables
dotenv.config();
//console.log("HOTEL_SERVICE_PORT:", process.env.HOTEL_SERVICE_PORT);
//const HOTEL_SERVICE_PORT = parseInt(process.env.HOTEL_SERVICE_PORT as string, 10);
const HOTEL_SERVICE_PORT = process.env.HOTEL_SERVICE_PORT as string;



//session
declare module 'express-session' {
  export interface SessionData {
    isLoggedIn: boolean, 
    username: string
  }
}

// express app
const app = express(); 

// cookie parser
// Parse incoming JSON request.
app.use(express.json());
app.use(cookieParser()); 

// session
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

//Connect to Database 
connectHotelDB(); 

// middleware
app.use((req, res, next) => {
  console.log(`Request received at Hotel Service: ${req.method} ${req.path}`);
  next();
}); 

// routes
app.use("/api/hotels", hotelRouter);
app.use('/', healthRouter);

// Start server only if file runs direkt
if (require.main === module) {
  app.listen(7703, '0.0.0.0', () => {
    console.log(`Hotel-Service Listening on port ${HOTEL_SERVICE_PORT}`); 
  });
}

// Exportera app for testing
export { app };
