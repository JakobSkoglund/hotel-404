import mongoose from "mongoose"; 

import { Booking } from "../Model/Booking"; 
//mongoose.connect("mongodb://127.0.0.1:27017/webdev"); 
import { Hotel } from "../Model/HotelModel"; 
import { time } from "console";

// Fetch hotels, optionally filtered by city, and return only those available between the given dates
export async function getHotels(city: string | null, fromDate: string,  toDate: string){
  var hotels;
  if(city){
    hotels = await Hotel.find({'display.city': city}); 
  }
  else{
    hotels = await Hotel.find(); 
  }
  //Filter hotels that are unavailable
  var freeHotels = [];
  console.log(hotels.length); 
  for(let hotel of hotels){
    const isFree = await hotelFreeBetweenDates(hotel, fromDate, toDate); 
    if(isFree){
      freeHotels.push(hotel); 
    }
  }
  return freeHotels; 
}
// Check if a hotel is available between the given dates
export async function hotelFreeBetweenDates(hotel:any, fromDate: string, toDate: string){
  const hotelId = hotel._id; 
  const bookings = await Booking.find({hotel: hotelId});
  for(let booking of bookings){
    const fromDateAsDate = new Date(fromDate); 
    const toDateAsDate = new Date(toDate);
    const bookingFromDate = new Date(booking.from_date);  
    const bookingToDate = new Date(booking.to_date);

    if(fromDateAsDate <= bookingToDate && toDateAsDate <= bookingFromDate){
      return false;
    }
  } 
  return true; 
}

export async function getAllHotels(){
  const hotels = await Hotel.find();
  return hotels; 
}
// Get hotel by its ID, throw an error if not found
export async function getHotelDocumentById(hotelId: string)
{  
    try {
        const hotel = await Hotel.findById(hotelId);
        if(!hotel)
        {
            console.log("couldn't find hotel"); 
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
// Get hotel by its name, throw an error if not found
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
// Create a new hotel record
export async function createHotel(body: any){
  await Hotel.create(body); 
}


