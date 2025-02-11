import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { logger } from "../../Logging/logger"; 
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as string;

// Middleware function to authenticate the JWT token
export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
        
    const token = req.cookies.token;

    if (!token) {
        logger.error("Unauthorized: No token found");
        return res.sendStatus(401); // Unauthorized: No token found
    }

    try {
        
        // Verify token
        const decoded = jwt.verify(token, accessTokenSecret) as { username: string };
        // Attach the decoded username to req.user
        //(req as any).user = { username: decoded.username };
        (req as any).user = decoded;  // Attach decoded user to request
        logger.info("Valid token"); 
        next();
        
    } catch (error) {
        logger.error("Invalid token"); 
        return res.status(403); // Forbidden: Invalid token
    }
};
