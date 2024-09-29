import mongoose from "mongoose";
import { User } from "../Model/User";
import { error } from "console";

mongoose.connect("mongodb://127.0.0.1:27017/webdev");

User.create({
    name: "Adam",
    lastname:"abc",
    username:"Adam123",
    age:21,
    password:"0000",
    isAdmin:false
});
console.log("Found connection");

//function som hanterar login
async function AuthLogin (username: string, password:string)
{
    try {
        const found = await User.findOne({username:username, password:password})
        if (!found)
        {
            return {error: 'User not found'};
        }
        //Om den hittar ett doc där username och password stämmer så fås _id
        return found._id;
    }
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



