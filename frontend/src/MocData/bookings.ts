import {IBooking} from "../Model/Booking"; 

export const bookings: IBooking[] =  [
 {id: "1", user:"Calle123", hotel:"The Stack Overflow Hotel", from_date: new Date("2024-09-15").toISOString().split('T')[0], to_date: new Date("2024-09-20").toISOString().split('T')[0], cost: 200},  
  {id: "2", user:"Calle123", hotel:"The Infinite Loop Lodge", from_date: new Date("2024-09-24").toISOString().split('T')[0], to_date: new Date("2024-09-30").toISOString().split('T')[0], cost: 400},  
]  

