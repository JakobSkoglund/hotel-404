import jwt from "jsonwebtoken"; 
import { Request, Response } from "express";
import { User } from "../models/User";
import { generateAccessToken } from "../services/tokenService";


// Login for a user
export const login = async (req: Request, res: Response) => {
    const {username, password} = req.body; 
     
    try {
        // call function that checks if user&password is in database
        const validUser = await AuthLogin(username, password);    

        // Generate JWT token
        const accessToken = generateAccessToken({ username });


         // Set token as HTTP-only cookie
        res.cookie("token", accessToken, { httpOnly: true, secure: process.env.NODE_ENV === "production" });

        // Store session info
        req.session.isLoggedIn = true;
        req.session.username = username;

        // Send sucesscode response
        return res.status(201).json({message: "Login successful"});
    }
    catch (error) {
        console.log(error); 
        res.status(400).send(error)
    }

}

// Function that handles signup
export const signup = async (req: Request, res: Response) => {
    const {username, password, name, lastname, age} = req.body;
    const isAdmin = false;
    try {
        // try to create a new User
        const createUser = await newUser(name, lastname, username, age, password, isAdmin);
        
        // Generate JWT token
        const accessToken = generateAccessToken({ username });

         // Set token as HTTP-only cookie
        res.cookie("token", accessToken, { httpOnly: true, secure: process.env.NODE_ENV === "production" });

        // Store session info
        req.session.isLoggedIn = true;
        req.session.username = username;

        
        // Send sucess code response
        return res.status(201).json({message: "User Successfully created!"});
    }

    catch (error) {
        return res.sendStatus(400).json({message: "Could not create an account"});
    }
}

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
        console.log(found._id)
        return found._id;
    }

    // If error then throw error
    catch (error)
    {
        if(error instanceof Error) {
            console.error('Nånting', error.message)
        }
        else 
        {
            console.error('annat', error)
        }
        throw error;
    }

}

// Function that checks if username is already taken
// Return true if unique, false if username is taken
async function usernameCheck(username: string)
{
    try {
        const check = await User.findOne({username:username})

        if(check)
        {
            return false;
        }
        return true;
    }
    catch (error)
    {
        console.error(error)
    }
}

//En funktion för att kolla ålder
//Om åldern är ok returnar den true 
function checkAge (age:number) 
{
    return age >=18;
}

//Function för att hantera en ny användare
export async function newUser(name:string, lastname:string, username:string, age: number, password: string, isAdmin: boolean) {
    
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

        console.log("User Successfully created!");
    
    

}

// Function to delete a user
export async function deleteUser(username:string) {
    try 
    {
        // Find the user, delete the users bookings and then delete the user
        const user  = await User.findOne({username: username});
        await Booking.deleteMany({user: username});
        await User.deleteOne({username: username });
    }
    catch (error)
    {
        if (error instanceof Error) 
        {
            console.error('Error deleting user by ID:', error.message);
        } 
        else 
        {
            console.error('An unexpected error occurred:', error);
        }

        throw error;
    }

}



