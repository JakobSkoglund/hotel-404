import express from "express"; 
import cors from "cors"; 
import cookieParser from "cookie-parser"; 
import session from "express-session"; 
import userRouter from "./routes/userRoutes.js"; 

// session
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



// routes
app.use("/api/user", userRouter);



// middleware
app.use((req, _, next) => {
  console.log(req.path, req.method); 
  next(); 
}); 


// Start server
app.listen(7700, () => {
  console.log("User-ServiceListening on port 7700"); 
}); 
