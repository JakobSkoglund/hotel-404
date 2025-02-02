import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "fallback-secret";

// Middleware function to authenticate the JWT token
export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    const { username } = req.body;
    console.log(username);


    if (!token) {
        return res.sendStatus(401); // Unauthorized: No token found
    }
    console.log("token found");
    try {

        // DOES NOT VERIFY
        // Verify token
        const decoded = jwt.verify(token, accessTokenSecret) as { username: string };
        console.log("jtw verified");
        // Attach the decoded username to req.user
        (req as any).user = { username: decoded.username };

        console.log("decoded = " + decoded);
        console.log("user = " + decoded.username);

        next();
        
    } catch (error) {
        return res.sendStatus(403); // Forbidden: Invalid token
    }
};
