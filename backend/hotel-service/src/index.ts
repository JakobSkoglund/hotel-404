import express from "express";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectHotelDB from "./config/db";
import hotelRouter from "./routes/hotelRoutes";

dotenv.config();
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

// cors
app.use(cors({
  origin: "http://localhost:3000", 
  credentials: true
})); 

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

// routes
app.use("/api/hotels", hotelRouter);



// middleware
app.use((req, _, next) => {
  console.log(req.path, req.method); 
  next(); 
}); 


// Start server
app.listen(HOTEL_SERVICE_PORT, () => {
  console.log(`Hotel-Service Listening on port ${HOTEL_SERVICE_PORT}`); 
}); 
