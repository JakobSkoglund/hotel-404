import {IUser} from "../Model/User";  

/*export interface IProfile {
    name: string;
    username: string;
    age: string;
    password:string;
    lastname:string;
    key:string;

    //lägg til mer om du vill
}*/
// Den här listan kommer att användas som en MOCK för att testa Login funktionalliteten 
export const profiles: IUser[] = [
    {name:'George',lastname:'Saba', username:'George123', age:20, password:'0000', key:'1', isAdmin:false},
    {name:'Amanda', lastname:'Nyander', username:'Amanda123', age:21, password:'0000', key:'2', isAdmin:false},
    {name:'Calle', lastname:'Ovinder', username:'Calle123', age:22, password:'0000', key:'3', isAdmin:false},
    {name:'Deividas', lastname:'Malaska', username:'Deividas123', age:23, password:'0000', key:'4', isAdmin:false},
]; 