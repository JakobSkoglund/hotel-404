export interface IHotel {
    price: string;
    image: string;
    description: string;
    title:string;
    key:string;

    //lägg til mer om du vill
}
// Den här listan kommer att användas som en MOCK för att testa Login funktionalliteten 
export const hotels: IHotel[] = [
    {title:'The Stack Overflow Hotel', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmVBBG2nPwGQPO3qiCbizRb7Bu8MbjdHHCdg&s', price:'50', description:'Rooms are endless, but finding one is a bug! Enjoy infinite floors, recursive hallways, and answers like “It depends.” Stuck? Just restart your stay!', key:'1'},
    {title:'The Infinite Loop Lodge', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmVBBG2nPwGQPO3qiCbizRb7Bu8MbjdHHCdg&s', price:'40', description:'Rooms are endless, but finding one is a bug! Enjoy infinite floors, recursive hallways, and answers like “It depends.” Stuck? Just restart your stay!', key:'2'},
    {title:'The Debuggers Dan', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmVBBG2nPwGQPO3qiCbizRb7Bu8MbjdHHCdg&s', price:'30', description:'Rooms are endless, but finding one is a bug! Enjoy infinite floors, recursive hallways, and answers like “It depends.” Stuck? Just restart your stay!', key:'3'},
    {title:'Syntax Error Suites', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmVBBG2nPwGQPO3qiCbizRb7Bu8MbjdHHCdg&s', price:'150', description:'Rooms are endless, but finding one is a bug! Enjoy infinite floors, recursive hallways, and answers like “It depends.” Stuck? Just restart your stay!', key:'4'},
    {title:'Hello World Hostel', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmVBBG2nPwGQPO3qiCbizRb7Bu8MbjdHHCdg&s', price:'250', description:'Rooms are endless, but finding one is a bug! Enjoy infinite floors, recursive hallways, and answers like “It depends.” Stuck? Just restart your stay!', key:'5'},
    {title:'The Array Stay', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmVBBG2nPwGQPO3qiCbizRb7Bu8MbjdHHCdg&s', price:'130', description:'Rooms are endless, but finding one is a bug! Enjoy infinite floors, recursive hallways, and answers like “It depends.” Stuck? Just restart your stay!', key:'6'},
]; 