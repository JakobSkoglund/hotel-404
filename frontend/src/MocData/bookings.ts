export interface IBooking {
  id: number; 
  user: string; 
  hotel: string; 
  from_date: string; 
  to_date: string;
  cost: number; 
  
} 

export const bookings: IBooking[] =  [
  {id: 1, user:"Calle123", hotel:"Hilton", from_date: new Date("2024-09-15").toISOString().split('T')[0], to_date: new Date("2024-09-20").toISOString().split('T')[0], cost: 200},  
  {id: 2, user:"Calle123", hotel:"Strawberry", from_date: new Date("2024-09-24").toISOString().split('T')[0], to_date: new Date("2024-09-30").toISOString().split('T')[0], cost: 400},  
] 
