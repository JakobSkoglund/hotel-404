import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import {Request, Response, NextFunction} from "express"; 


export const accessTokenSecret = "CcBcjADRsaP6AHcWZ0tn"

interface AuthRequest extends Request {
  user: String | JwtPayload
}
export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token= req.cookies.token;

    if (token) {
        const decode: any = jwt.verify(token, accessTokenSecret);
        req.user = decode.username;
        next(); 

    } else {
        res.sendStatus(401);
    }
};

