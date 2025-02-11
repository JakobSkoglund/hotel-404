import jwt from "jsonwebtoken"; 
import { Request, Response } from "express";
import { User } from "../models/User";
import { generateAccessToken } from "../services/tokenService";
import axios from "axios";
import { logger } from "../../../Logging/logger";


// Login for a user
export const login = async (req: Request, res: Response) => {
    const {username, password} = req.body; 
     
    try {
        // call function that checks if user&password is in database
        logger.info(`Function {Login}: Attempting login for user: ${username}`);
        const validUser = await AuthLogin(username, password);    

        // Generate JWT token
        const accessToken = generateAccessToken({ username });


         // Set token as HTTP-only cookie
        res.cookie("token", accessToken, { httpOnly: true, secure: process.env.NODE_ENV === "production" });

        // Store session info
        req.session.isLoggedIn = true;
        req.session.username = username;

        // Send sucesscode response
        logger.info(`Login successful for user: ${username}`);
        logger.info('');
        return res.status(201).json({message: "Login successful"});
    }
    catch (error: any) {
        logger.error(`Login failed for user: ${username}, Error: ${error.message}`);
        logger.info('');
        res.status(400).send(error)
    }

}

// Function that handles signup
export const signup = async (req: Request, res: Response) => {

    const {username, password, name, lastname, age} = req.body;
    const isAdmin = false;

    try {
        // try to create a new User
        logger.info(`Function {signup}: Attempting to sign up user: ${username}`);
        const createUser = await newUser(name, lastname, username, age, password, isAdmin);
        
        // Generate JWT token
        const accessToken = generateAccessToken({ username });

         // Set token as HTTP-only cookie
        res.cookie("token", accessToken, { httpOnly: true, secure: process.env.NODE_ENV === "production" });

        // Store session info
        req.session.isLoggedIn = true;
        req.session.username = username;

        
        // Send sucess code response
        logger.info(`User successfully created: ${username}`);
        logger.info('');
        return res.status(201).json({message: "User Successfully created!"});
    }

    catch (error: any) {
        logger.error(`Signup failed for user: ${username}, Error: ${error.message}`);
        logger.info('');
        return res.status(400).json({ message: "Could not create an account" });
    }
}

// Function to delete a user
export const deleteUser = async (req: Request, res: Response) => {
    try 
    {
        logger.info("Function {deleteUser}: Attempting to delete a user");
        // Extract username from request body
        const { username } = req.body;
        
        // if UserId is not sent/recieved
        if (!username) {
            logger.error("Delete user failed: Username is required");
            return res.status(400).json({ error: "User name is required" });
        }

        // Find the user, delete the users bookings and then delete the user
        const user  = await User.findOne({username: username});

        if (!user) {
            logger.error(`Delete user failed: User ${username} not found`);
            return res.status(404).json({ error: "User not found" });
        }

        // API-call to bookking-service, try to delete all the users bookings
        logger.info(`Deleting bookings for user: ${username}`);
        const response = await axios.delete(`http://localhost:7700/api/booking/deleteBookings/${username}`);
        if (response.status != 200) {
            logger.error(`Booking deletion failed for user: ${username}`);
            throw Error;
        } 

        await User.deleteOne({username: username});
        logger.info(`User ${username} deleted successfully`);
        logger.info('');

        // respond with sucessmessage
        return res.status(200).json({ message: "User deleted successfully" });

    }
    catch (error: any)
    {
        logger.error(`Error deleting user: ${error.message}`);
        logger.info('');
        return res.status(500).json({ error: "Internal server error" });
    }
}

// Function that handles logout
export const logout = async (req: Request, res: Response) => {
    try {
        logger.info("Function {logout}: Attempting logout");
        req.session.destroy((err) => {
            if (err) {
                logger.error(`Logout failed: ${err.message}`);
                logger.info('');
                return res.status(500).json({ message: "Logout failed" });
            }
            res.clearCookie("token"); // Clear JWT token
            logger.info("Logout successful");
            logger.info('');
            return res.status(200).json({message: "Logout sucess"});
        });
    } catch (error: any) {
        logger.error(`Logout failed: ${error.message}`);
        logger.info('');
        res.sendStatus(400);
    }
};


// Function that handles user authentication (session check)
export const session = async (req: Request, res: Response) => {
    try {
        // Since authenticateJWT middleware already verifies the token, we just return session info
        logger.info(`Function {session}: Checking session for user: ${(req as any).user.username}`);
        return res.status(200).json({
            message: "Session active",
            user: (req as any).user.username
        });

    } catch (error: any) {
        logger.error(`Session check failed: ${error.message}`);
        logger.info('');
        return res.status(500).json({ error: "Internal server error" });
    }
};








///////// Helper functions that handles some logic for functions above


//function som hanterar login
export async function AuthLogin(username: string, password:string)
{
    try {

        // Try to match username&password with someone in database
        logger.info(`Function {AuthLogin}: Attempting to authenticate user: ${username}`);
        const found = await User.findOne({username:username, password:password})
        
        // If there is no such user throw error
        if (!found)
        {
            logger.error(`Authentication failed for user: ${username}`);
            logger.info('');
            throw new Error('User not found');
        }

        //Om den hittar ett doc där username och password stämmer så fås _id
        logger.info("Successfull authentication");
        logger.info('');
        return found._id;
    }

    // If error then throw error
    catch (error: any)
    {
        logger.error(`Error during authentication: ${error.message}`);
        logger.info('');
        throw error;
    }

}

// Function that checks if username is already taken
// Return true if unique, false if username is taken
async function usernameCheck(username: string): Promise<boolean> {
    const check = await User.exists({ username });
    return !check;
}


//En funktion för att kolla ålder
//Om åldern är ok returnar den true 
const checkAge = (age: number) => age >= 18;


//Function för att hantera en ny användare
export async function newUser(name:string, lastname:string, username:string, age: number, password: string, isAdmin: boolean) {

    logger.info("Function {newUser}: Attempting to create new user");
    const firstCheck = await usernameCheck(username);
    const secondCheck = checkAge(age);

    if(!firstCheck)
    {   
        logger.error(`Username ${username} is already taken`);
        logger.info('');
        throw new Error('This username is taken');
    }
    else if(!secondCheck)
    {
        logger.error(`User ${username} is too young to create an account`);
        logger.info('');
        throw new Error('You are too young to make an account');
    }
    logger.info("Successfully created new user"); 
    logger.info('');

    await User.create({
        name:       name,
        lastname:   lastname,
        username:   username,
        password:   password,
        isAdmin:    isAdmin,
        age:        age
    });

}