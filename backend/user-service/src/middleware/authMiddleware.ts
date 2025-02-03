import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "fallback-secret";

// Middleware function to authenticate the JWT token
export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
        
    const token = req.cookies.token;

    if (!token) {
        return res.sendStatus(401); // Unauthorized: No token found
    }

    try {

        
        // Verify token
        const decoded = jwt.verify(token, accessTokenSecret) as { username: string };
        // Attach the decoded username to req.user
        //(req as any).user = { username: decoded.username };
        (req as any).user = decoded;  // Attach decoded user to request
        next();
        
    } catch (error) {
        console.log("Invalid token");
        return res.status(403); // Forbidden: Invalid token
    }
};
