import express from "express"; 
import bookingRouter from "./routes/bookingRouter";
import connectDB from "./config/db";
import cors from 'cors';
import session from "express-session";
import cookieParser from "cookie-parser"; 
import dotenv from "dotenv";

dotenv.config();
const BOOKING_SERVICE_PORT = process.env.BOOKING_SERVICE_PORT as string;


declare module 'express-session' {
  export interface SessionData {
    isLoggedIn: boolean, 
    username: string
  }
}

const app = express(); 

app.use(cors({
  origin: "http://localhost:7700", 
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


// middleware
app.use((req, res, next) => {
  console.log(`Request received at Booking Service: ${req.method} ${req.path}`);
  next();
}); 

// Connect to database
connectDB()

// routes that booking uses
app.use("/api/booking", bookingRouter);

// Start server
app.listen(BOOKING_SERVICE_PORT, () => {
  console.log(`Booking-Service is Listening on port ${BOOKING_SERVICE_PORT}`); 
}); 
