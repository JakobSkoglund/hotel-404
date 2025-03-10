// src/index.js
// för att köra: PS C:\Users\David\Desktop\Skola\WA\hotel-404\backend\src> npx tsx index.ts
import express from "express"; 
import cors from 'cors';
import session from "express-session";
import { createProxyMiddleware } from "http-proxy-middleware";
import dotenv from "dotenv";

// Load .env variables
dotenv.config();

// Session structure
declare module 'express-session' {
  export interface SessionData {
    isLoggedIn: boolean, 
    username: string
  }
}

// express app
const app = express(); 

// Set up CORS (ensure front-end can access the API Gateway)
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,  // to send cookies if needed
}));
app.options('*', cors()); // This handles OPTIONS for all routes


// Session middleware
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

// Load the .env variables into variables
const mongoURI: string = process.env.DB_URI as string;
const API_GATEWAY_PORT = process.env.API_GATEWAY_PORT as string;
const USER_SERVICE_PORT = process.env.USER_SERVICE_PORT as string;
const BOOKING_SERVICE_PORT = process.env.BOOKING_SERVICE_PORT as string;
const HOTEL_SERVICE_PORT = process.env.HOTEL_SERVICE_PORT as string;


// Define the microservices and their base URLs
const services = {
  'user-service'    : `http://localhost:${USER_SERVICE_PORT}`,
  'booking-service' : `http://localhost:${BOOKING_SERVICE_PORT}`,
  'hotel-service'   : `http://9.223.157.203:${HOTEL_SERVICE_PORT}`
};




// Proxy to User Service
 app.use('/api/user', createProxyMiddleware({
  target: services["user-service"],  // Forward to user-service (running on localhost:7701)
  changeOrigin: true,  // Change the origin of the request to the target's origin
  pathRewrite: (path, req) => {
    // Adjust the path if necessary
    const rewrittenPath = "/api/user" + path;
    /* console.log(`${path} -> ${rewrittenPath}`); */  // Log path transformation
    return rewrittenPath;
  },
}));




app.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(204);
});


// Proxy to Booking Service
app.use('/api/booking', createProxyMiddleware({
  target: services["booking-service"],
  changeOrigin: true,
  pathRewrite: (path, req) => {
    const rewrittenPath = "/api/booking" + path
    /* console.log(`${path} -> ${rewrittenPath}`); */  // Log path transformation
    return rewrittenPath;
  },
}));




// Proxy to Hotel Service
app.use('/api/hotels', createProxyMiddleware({
  target: services["hotel-service"],
  changeOrigin: true,
  pathRewrite: (path, req) => {
    const rewrittenPath = "/api/hotels" + path
    /* console.log(`${path} -> ${rewrittenPath}`); */  // Log path transformation
    return rewrittenPath;
  },
}));


// Middleware
app.use((req, _, next) => {
  console.log(req.path, req.method); 
  next(); 
 
 });  



// Start server
app.listen(API_GATEWAY_PORT, () => {
  console.log(`Listening on port ${API_GATEWAY_PORT}`); 
}); 
