import mongoose from "mongoose"; 

import { Hotel } from "../Model/Hotel"; 
import { bookingSchema } from "../Model/Booking"; 

mongoose.connect("mongodb://127.0.0.1:27017/webdev"); 

console.log("found connection"); 
const bookingModel = mongoose.model('Booking', bookingSchema); 

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
  
}

async function hotelFreeBetweenDates(hotel:any, fromDate: string, toDate: string){
  console.log
  const hotelId = hotel._id; 
  const bookings = await bookingModel.find({hotelId: hotelId});
  console.log(bookings); 
  for(let booking in bookings){
    const fromDateAsDate = new Date(fromDate); 
    const toDateAsDate = new Date(toDate);
    const bookingFromDate = new Date(booking.fromDate); 
    const bookingToDate = new Date(booking.toDate);

    if(fromDateAsDate >= bookingFromDate && fromDateAsDate <= bookingToDate){
      return false; 
    } 
    else if(toDateAsDate >= bookingFromDate && toDateAsDate <= bookingToDate){
      return false; 
    }
  }
  return true; 
}

main(); 

async function main() {
  console.log(hotel); 
  const val = await hotelFreeBetweenDates(hotel[0], "2024-09-27", "2024-09-31"); 
  console.log(val); 

}
