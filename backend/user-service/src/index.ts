import express from "express"; 
import cors from "cors"; 
import cookieParser from "cookie-parser"; 
import session from "express-session"; 
import userRouter from "./routes/userRoutes.js"; 
import connectDB from "./config/db.js"
import dotenv from "dotenv";

// Load .env variables
dotenv.config();
const USER_SERVICE_PORT = process.env.USER_SERVICE_PORT as string;

// session
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

// Connect to db
connectDB();

// middleware
app.use((req, res, next) => {
  console.log(`Request received at User Service: ${req.method} ${req.path}`);
  next(); 
});

// routes
app.use("/api/user", userRouter);


// Start server
app.listen(USER_SERVICE_PORT, () => {
  console.log(`User-ServiceListening on port ${USER_SERVICE_PORT}`); 
}); 
