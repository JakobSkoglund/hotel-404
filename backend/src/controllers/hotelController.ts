import mongoose from "mongoose"; 

import { Hotel } from "../Model/HotelModel"; 
import { Booking } from "../Model/Booking"; 

mongoose.connect("mongodb://127.0.0.1:27017/webdev"); 

Booking.create({
  id: 1, 
  user: "Calle256", 
  from_date: "2024-10-01", 
  to_date: "2024-10-04", 
  cost: 200, 
  hotel: '66f6c89bdee2544cac6937b9'
}); 

console.log("found connection"); 

async function getHotels(city: string | null, fromDate: string,  toDate: string){
  var hotels; 
  if(city !== null){
    hotels = await Hotel.find({city: city}); 
  }
  else{
    hotels = await Hotel.find(); 
  }
  const hotelIds = hotels.map((hotel) => {
    return hotel._id; 
  }); 
  console.log(hotelIds);

  //Filter hotels that are unavailable
  var freeHotels = []
  for(let hotel in hotels){
    const isFree = await hotelFreeBetweenDates(hotel, fromDate, toDate); 
    if(isFree){
      freeHotels.push(hotel); 
    }
  }
  return freeHotels; 
}

async function hotelFreeBetweenDates(hotel:any, fromDate: string, toDate: string){
  console.log
  const hotelId = hotel._id; 
  const bookings = await Booking.find({hotel: hotelId});
  console.log(bookings); 
  console.log(typeof bookings); 
  for(let booking in bookings){
    const fromDateAsDate = new Date(fromDate); 
    const toDateAsDate = new Date(toDate);
    const bookingFromDate = new Date(booking.fromDate); 
    const bookingToDate = new Date(booking.toDate);

    if(fromDateAsDate <= bookingToDate && toDateAsDate <= bookingFromDate){
      return false;
    }
  } 
  return true; 
}

main(); 

async function main() {
  const hotels = await getHotels("Jönköping", "2024-10-02", "2024-10-14"); 
  console.log(hotels);
  const val = await hotelFreeBetweenDates(hotels[0], "2024-09-27", "2024-09-31");
}
