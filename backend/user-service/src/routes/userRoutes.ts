import { Router } from "express"; 
import { login, signup, deleteUser, logout, session } from "../controllers/userController";
import { authenticateJWT } from "../middleware/authMiddleware";


const router = Router(); 

// Test API just to see if we have connection to server
// API-Call:   POST http://localhost:7701/api/user/test
router.post('/test', (req, res) => {
  console.log('Request received in user-service:', req.body);
  
  // Process the request and send a proper response
  res.status(200).json({ message: 'Test successful' });
});


// login
router.post("/login", login);


// signup
router.post("/signup", signup);

// logout
router.post("/logout", logout);


////// protected routes under the JWT ////////

// delete user
router.delete("/deleteme", authenticateJWT, deleteUser);


// session
router.get("/session", authenticateJWT, session);

export default router; 