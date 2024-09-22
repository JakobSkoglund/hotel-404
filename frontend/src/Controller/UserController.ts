import { profiles } from "../MocData/login";
import { IUser } from "../Model/User";

function verifyUser(username: String, password: String): boolean{
    //Will make an API request in the future. 
    //Not very secure at the moment, will need to be fixed
    profiles.forEach(user => {
        if (user.username === username && user.password === password){
            return true; 
        }
    })  
    return false; 
}

function createUser(name: string, username: string, age: string, password: string, 
    lastname:string, key: string, isAdmin:boolean): IUser{   
        const user: IUser = {
            name:name, 
            username: username, 
            age: age, 
            password: password, 
            lastname: lastname, 
            key: key, 
            isAdmin: isAdmin
        }; 
        return user; 
    }