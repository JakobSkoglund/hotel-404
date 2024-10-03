import jwt from "jsonwebtoken"; 
import {Request, Response, NextFunction} from "express"; 


export const accessTokenSecret = "CcBcjADRsaP6AHcWZ0tn"


export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const token= req.cookies.token;

    if (token) {
        const decode = jwt.verify(token, accessTokenSecret);
        console.log(typeof decode); 
        req.user = decode.username;
        next(); 

    } else {
        res.sendStatus(401);
    }
};

