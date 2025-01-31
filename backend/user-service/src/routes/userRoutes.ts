import { Router } from "express"; 
import { login, signup, deleteUser, logout, session } from "../controllers/userController";
const router = Router(); 

// login
router.post("/login", login);

// signup
router.post("/signup", signup);

// delete user
router.delete("/deleteme", deleteUser);

// logout
router.get("/logout", logout);

// session
router.get("/session", session);

export default router; 