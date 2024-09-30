import mongoose from "mongoose"; 

import { Booking } from "../Model/Booking"; 
//mongoose.connect("mongodb://127.0.0.1:27017/webdev"); 
import { Hotel } from "../Model/HotelModel"; 


/*Booking.create({
  id: 1, 
  user: "Calle256", 
  from_date: "2024-10-01", 
  to_date: "2024-10-04", 
  cost: 200, 
  hotel: '66f6c89bdee2544cac6937b9'
<<<<<<< HEAD
});
=======
});*/ 


export async function getHotels(city: string | null, fromDate: string,  toDate: string){
  var hotels;
  console.log(city);
  console.log(!city); 
  if(city){
    hotels = await Hotel.find({display: {city: city}}); 
  }
  else{
    hotels = await Hotel.find(); 
  }
  console.log(hotels); 
  //Filter hotels that are unavailable
  var freeHotels = hotels; 
/*  for(let hotel in hotels){
    const isFree = await hotelFreeBetweenDates(hotel, fromDate, toDate); 
    if(isFree){
      freeHotels.push(hotel); 
    }
  }*/
  return freeHotels; 
}

export async function hotelFreeBetweenDates(hotel:any, fromDate: string, toDate: string){
  console.log
  const hotelId = hotel._id; 
  const bookings = await Booking.find({hotel: hotelId});
  console.log(bookings); 
  console.log(typeof bookings); 
  for(let booking in bookings){
    const fromDateAsDate = new Date(fromDate); 
    const toDateAsDate = new Date(toDate);

    //Ger error men vet inte varför. Funkar när den kör i alla fall
    const bookingFromDate = new Date(booking.fromDate);  
    const bookingToDate = new Date(booking.toDate);

    if(fromDateAsDate <= bookingToDate && toDateAsDate <= bookingFromDate){
      return false;
    }
  } 
  return true; 
}

export async function getHotelDocumentById(hotelId: string)
{   
    try {
        const hotel = await Hotel.findById(hotelId);
        if(!hotel)
        {
            throw new Error('Error 001: Hotel not found');
        }
        return hotel;
    }
    catch (error) 
    {
        if (error instanceof Error) {
            console.error('Error retrieving hotel by ID:', error.message);
        } else {
            console.error('An unexpected error occurred:', error);
        }
        throw error; // re-throw the error if needed
    }
}

export async function getHotelDocumentByName(hotelName: string)
{   
    try {
        const hotel = await Hotel.findOne({ 'display.title': hotelName});
        if(!hotel)
        {
            throw new Error('Error 002: Hotel not found');
        }
        return hotel;
    }
    catch (error) 
    {
        if (error instanceof Error) {
            console.error('Error retrieving hotel by Name:', error.message);
        } else {
            console.error('An unexpected error occurred:', error);
        }
        throw error; // re-throw the error if needed
    }
}


