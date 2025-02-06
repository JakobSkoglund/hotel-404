import jwt from "jsonwebtoken";
import dotenv from "dotenv";


// Load env variables
dotenv.config();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as string;

// sign and generate a accesstoken for the user
export const generateAccessToken = (payload: object): string => {
  return jwt.sign(payload, accessTokenSecret, { expiresIn: "20m" });
};
