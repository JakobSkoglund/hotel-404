
import axios, {AxiosError} from 'axios';


// HTTP request implemented in backend
export async function VerifyUser (username: string, password:string): Promise<boolean | string>
{
  try 
  {
    const respone = await axios.post('http://localhost:7700/api/user/login', {
      username: username,
      password: password
    });
    console.log('Login seccessful: ', respone.data);
    return true; 
  } catch (err:unknown) {
    const error = err as AxiosError;
    if(error.response){
      console.error("invalid user", error); 
      return "Invalid username/password combination"; 
    } else {
      console.error('Login failed',error);
      return "Couldn't reach server. Please check your internet connection";
    }
  }
}

// HTTP request implemented in backend
export async function CreateUser (name:string, lastname:string, username:string, age: number, password:string, isAdmin:boolean) : Promise<boolean>
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

// HTTP request implemented in backend
export async function DeleteUser(username: string) {
  try {
    console.log(username); 
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

// HTTP request implemented in backend
export async function LogOut() {
  try {
    const response = await axios.post('http://localhost:7700/api/user/logout');
    console.log(response.data.message);
    return true;
  } catch (error) {
    console.log("Logout unsuccessful");
    return false;
  }
}