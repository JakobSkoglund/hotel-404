import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as string;

interface AuthRequest extends Request {
  user?: { username: string; role: string }; // Include role in user object
}

//  Middleware to verify JWT token and attach user info to request
export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) {
    return res.sendStatus(401); // ❌ Unauthorized: No token found
  }

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, accessTokenSecret) as { username: string; role: string };

    // Attach user info to request
    req.user = decoded;

    next(); // Proceed to next middleware
  } catch (error) {
    console.log("Invalid token");
    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }
};

// Middleware to check user role
export const authorizeRole = (role: string) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ message: "Forbidden: You do not have permission" });
    }
    next(); // Proceed if user has the correct role
  };
};
