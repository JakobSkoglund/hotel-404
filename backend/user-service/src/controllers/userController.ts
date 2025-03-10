import { Request, Response } from "express";
import { User } from "../models/User";
import { generateAccessToken } from "../services/tokenService";
import axios from "axios";
import { logger } from "../../Logger/logger";


// Login for a user
export const login = async (req: Request, res: Response) => {
    const {username, password} = req.body; 
     
    try {
        
        // call function that checks if user&password is in database
        logger.info(""); 
        logger.info(`Attempting to login with username: ${username}`);
        const validUser = await AuthLogin(username, password);    

        // Generate JWT token
        logger.info("Generates an access token"); 
        const accessToken = generateAccessToken({ username });

        
         // Set token as HTTP-only cookie
        logger.info("Creates a Cookie"); 
        res.cookie("token", accessToken, { httpOnly: true, secure: process.env.NODE_ENV === "production" });

        // Store session info
        req.session.isLoggedIn = true;
        req.session.username = username;

        
        // Send sucesscode response
        logger.info(`Successfull login: ${username}`); 
        return res.status(201).json({message: "Login successful"});
    }
    catch (error) {
        logger.error("Failed to login: ", error); 
        res.status(400).send(error)
    }
    
}

// Function that handles signup
export const signup = async (req: Request, res: Response) => {
    const {username, password, name, lastname, age} = req.body;
    const isAdmin = false;
/*     console.log(req.body);
 */
    try {
        // try to create a new User
        logger.info("");
        logger.info(`Attempting to signup with username: ${username}`);
        const createUser = await newUser(name, lastname, username, age, password, isAdmin);
        
        // Generate JWT token
        logger.info("Generates an access token"); 
        const accessToken = generateAccessToken({ username });
        
        // Set token as HTTP-only cookie
        logger.info("Created a cookie"); 
        res.cookie("token", accessToken, { httpOnly: true, secure: process.env.NODE_ENV === "production" });
        
        // Store session info
        req.session.isLoggedIn = true;
        req.session.username = username;
                
        // Send sucess code response
        logger.info(`Successfull signup: ${username}`); 
        return res.status(201).json({message: "User Successfully created!"});
    }

    catch (error) {
        logger.error(`Failed to singup: ${error}`); 
        return res.status(400).json({ message: "Could not create an account" });
    }
}

// Function to delete a user
export const deleteUser = async (req: Request, res: Response) => {
    try 
    {
        // Extract username from request body
        const { username } = req.body;
        // if UserId is not sent/recieved
        logger.info(""); 
        logger.info(`Attempting to delete user with username: ${username}`); 
        if (!username) {
            logger.error("User name is required"); 
            return res.status(400).json({ error: "User name is required" });
        }

        // Find the user, delete the users bookings and then delete the user
        logger.info("Fetching the user to be deleted"); 
        const user  = await User.findOne({username: username});

        if (!user) {
            logger.error("User not found"); 
            return res.status(404).json({ error: "User not found" });
        }

        // API-call to bookking-service, try to delete all the users bookings
        logger.info("Deleting all the bookings of the user"); 
        const response = await axios.delete(`http://api-gateway:7700/api/booking/deleteBookings/${username}`);
        if (response.status != 200) {
            logger.error(`Failed to delete all the bookings: ${response.status}`); 
            throw Error;
        } 

        await User.deleteOne({username: username});

        // respond with sucessmessage
        logger.info(`Successfully deleted the user: ${username}`); 
        return res.status(200).json({ message: "User deleted successfully" });

    }
    catch (error)
    {
        logger.error(`Internal server error: ${error}`); 
        return res.status(500).json({ error: "Internal server error" });
    }
}

// Function that handles logout
export const logout = async (req: Request, res: Response) => {
    try {
        logger.info(""); 
        logger.info(`Attempting to logout user`);
        logger.info("Attempting to destroy session"); 
        req.session.destroy((err) => {
            if (err) {
                logger.error(err); 
                logger.error("Logout failed, failed to destroy session"); 
                return res.status(500).json({ message: "Logout failed" });
            }
            logger.info("Logout successfull"); 
            res.clearCookie("token"); // Clear JWT token
            return res.status(200).json({message: "Logout success"});
        });
    } catch (error) {
        logger.error("Failed to logout")
        res.sendStatus(400);
    }
};


// Function that handles user authentication (session check)
export const session = async (req: Request, res: Response) => {
    try {
        // Since authenticateJWT middleware already verifies the token, we just return session info
        return res.status(200).json({
            message: "Session active",
            user: (req as any).user.username
        });

    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};








///////// Helper functions that handles some logic for functions above


//function som hanterar login
export async function AuthLogin(username: string, password:string)
{
    try {

        // Try to match username&password with someone in database
        const found = await User.findOne({username:username, password:password})
        
        // If there is no such user throw error
        if (!found)
        {
            throw new Error('User not found');
        }

        //Om den hittar ett doc där username och password stämmer så fås _id
        return found._id;
    }

    // If error then throw error
    catch (error)
    {
        logger.info("Failed to find a user in the database"); 
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
    try{
        const firstCheck = await usernameCheck(username);
        const secondCheck = checkAge(age);

        if(!firstCheck)
        {   
            throw new Error('This username is taken');
        }
        else if(!secondCheck)
        {
            throw new Error('You are too young to make an account');
        }
        User.create({
            name: name,
            lastname: lastname,
            username:username,
            password:password,
            isAdmin: isAdmin,
            age: age

        })
    }
    catch(error){
        logger.error("Failed to create a user")
        logger.error("Username is already taken, or user is to young to make an account"); 
        throw error; 
    }

}