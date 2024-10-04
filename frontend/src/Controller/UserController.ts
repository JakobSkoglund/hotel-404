
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
    const respone = await axios.post('http://localhost:7700/api/user/login', {
      username: username,
      password: password
    });
    console.log('Login seccessful: ', respone.data);
    return true; 
  } catch (error) {
    console.error('Login failed',error);
    return false;
    return false; 
  }
}

export async function CreateUser (name:string, lastname:string, username:string, age: number, password:string, isAdmin:boolean)
{
  try 
  {
    const respone = await axios.post('http://localhost:7700/api/user/signup',{
      username: username,
      password: password,
      name: name,
      lastname:lastname,
      isAdmin: isAdmin,
      age:age
    });
    console.log('Sign Up seccessful ', respone.data);
    return true
  } catch (error) {
    console.error('Sign Up failed', error);
    return false;
  }
}

export async function DeleteUser(username: string) {
  try {
    console.log(username); 
    const params = new URLSearchParams([['username', username]]);
    const response = await axios.delete('http://localhost:7700/api/user/deleteme', {
      data: {username: username}
    });
    console.log("Deletion of user successful", response.data);
    return true;
  } catch (error) {
    console.error("Deletion of user unsuccessful", error);
    return false;
  }
}

/*
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
}*/

