import { Router } from "express"; 
import { login, signup, deleteUser, logout, session } from "../controllers/userController";
import { authenticateJWT } from "../middleware/authMiddleware";


const router = Router(); 

// login
router.post("/login", login);

// signup
router.post("/signup", signup);



////// protected routes under the JWT ////////

// delete user
router.delete("/deleteme", authenticateJWT, deleteUser);

// logout
router.post("/logout", authenticateJWT, logout);

// session
router.get("/session", authenticateJWT, session);

export default router; 