import { profiles } from "../MocData/login";
import { IUser } from "../Model/User";
import axios from 'axios';

/*export function VerifyUser(username: string, password: string): boolean{
    //Will make an API request in the future. 
    //Not very secure at the moment, will need to be fixed
    if(profiles.some(user => user.username === username && user.password === password)){
      return true; 
    }
    return false; 
}*/

export async function VerifyUser (username: string, password:string)
{
  try 
  {
    const respone = await axios.post('http://localhost:7700/login', {
      username,
      password
    });
    console.log('Login seccessful: ', respone.data);
  } catch (error) {
    console.error('Login failed',error);
  }
}
//
export function CreateUser(name: string, username: string, age: string, password: string, 
    lastname:string, key: string, isAdmin:boolean): IUser | string{   
        const user: IUser = {
            name:name, 
            username: username, 
            age: age, 
            password: password, 
            lastname: lastname, 
            key: key, 
            isAdmin: isAdmin
        }; 
        if(!name || !username || !age || !password || !lastname){
          return "invalid fields"; 
        } 
        else if(parseInt(age) <=17)
        {
          return "You need to be at least 18 years old"
        }
        profiles.forEach(user => {
          if(user.username === username){
            return "username already in use"; 
          }
        })
        return user; 
}

