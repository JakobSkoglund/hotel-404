import {IHotel} from "../Model/Hotel";
// Den här listan kommer att användas som en MOCK för att testa Login funktionalliteten 
export const hotels: IHotel[] = [
    {title:'The Stack Overflow Hotel', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmVBBG2nPwGQPO3qiCbizRb7Bu8MbjdHHCdg&s', price:'50', description:'Rooms are endless, but finding one is a bug! Enjoy infinite floors and halls, with answers like “It depends.” Stuck? Restart your stay!', key:'1', city:'New York'},
    {title:'The Infinite Loop Lodge', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmVBBG2nPwGQPO3qiCbizRb7Bu8MbjdHHCdg&s', price:'40', description:'Check-in once, and you’ll never check out! Guests enjoy endless repeats of the same experience... forever.', key:'2', city:'New York'},
    {title:'The Debuggers Dan', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmVBBG2nPwGQPO3qiCbizRb7Bu8MbjdHHCdg&s', price:'30', description:'Where every problem is your problem! Relax as you hunt for bugs in our glitchy but charming rooms.', key:'3', city:'Lund'},
    {title:'Syntax Error Suites', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmVBBG2nPwGQPO3qiCbizRb7Bu8MbjdHHCdg&s', price:'150', description:'Nothing works here, but no worries—you’ll just keep getting errors until you give up and enjoy the chaos!', key:'4', city:'Lund'},
    {title:'Hello World Hostel', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmVBBG2nPwGQPO3qiCbizRb7Bu8MbjdHHCdg&s', price:'250', description:'A fresh start for every guest! Say "Hello" to endless intros and goodbyes, with no main event in sight.', key:'5', city:'Lund'},
    {title:'The Array Stay', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmVBBG2nPwGQPO3qiCbizRb7Bu8MbjdHHCdg&s', price:'130', description:'Perfect for groups! You’ll all fit in... eventually. Just make sure you index your room properly!', key:'6', city:'Lund'},
    
    {title:'The Segmentation Fault Inn', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmVBBG2nPwGQPO3qiCbizRb7Bu8MbjdHHCdg&s', price:'75', description:'Lose track of your room and crash into confusion! Don’t worry, it’s part of the experience.', key:'7', city:'New York'},
    {title:'404 Not Found Suites', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmVBBG2nPwGQPO3qiCbizRb7Bu8MbjdHHCdg&s', price:'80', description:'Don’t bother asking for directions—no one’s found their room here yet, but feel free to search.', key:'8', city:'Lund'},
    {title:'The Null Pointer Palace', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmVBBG2nPwGQPO3qiCbizRb7Bu8MbjdHHCdg&s', price:'110', description:'Nothing to see here! We promise an absolutely empty experience, with voids in every corner.', key:'9', city:'New York'},
    {title:'The Refactor Retreat', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmVBBG2nPwGQPO3qiCbizRb7Bu8MbjdHHCdg&s', price:'69', description:'Your stay will constantly change, but never quite improve. Come back often for endless adjustments!', key:'10', city:'Stockholm'},
    {title:'The Git Commit Cottage', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmVBBG2nPwGQPO3qiCbizRb7Bu8MbjdHHCdg&s', price:'56', description:'Make yourself at home, but don’t forget to save your progress—or you’ll end up in someone else’s branch!', key:'11', city:'Stockholm'},
    {title:'The Binary Bungalow', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmVBBG2nPwGQPO3qiCbizRb7Bu8MbjdHHCdg&s', price:'70', description:'Cozy rooms for ones and zeroes only. Be prepared for on-off amenities and no in-between!', key:'12', city:'New York'},
    
    {title:'The Recursion Resort', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmVBBG2nPwGQPO3qiCbizRb7Bu8MbjdHHCdg&s', price:'77', description:'Enter once and find yourself right back where you started. Every visit is déjà vu all over again!', key:'13', city:'Stockholm'},
    {title:'Memory Leak Motel', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmVBBG2nPwGQPO3qiCbizRb7Bu8MbjdHHCdg&s', price:'98', description:'Lose track of time and space—literally! Once you check in, everything slowly vanishes, including your luggage.', key:'14', city:'Stockholm'},
    {title:'The Compilers Cabin', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmVBBG2nPwGQPO3qiCbizRb7Bu8MbjdHHCdg&s', price:'45', description:'Where nothing runs smoothly, but the views are great! Expect constant delays before anything works.', key:'15', city:'New York'},
    {title:'Overclocked Oasis', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmVBBG2nPwGQPO3qiCbizRb7Bu8MbjdHHCdg&s', price:'50', description:'Things move fast here, maybe too fast. Relax—if you can keep up without overheating!', key:'16', city:'Stockholm'},
    {title:'The Proxy Penthouses', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmVBBG2nPwGQPO3qiCbizRb7Bu8MbjdHHCdg&s', price:'175', description:'Your stay is managed through multiple layers, so don not expect direct answers from anyone... ever.', key:'17', city:'New York'},
    {title:'API Gateway Getaway', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmVBBG2nPwGQPO3qiCbizRb7Bu8MbjdHHCdg&s', price:'130', description:'Connect with everything you need! Well, maybe. It might take a few retries, or infinite loading.', key:'18', city:'Stockholm'},
]; 