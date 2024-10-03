import mongoose from "mongoose"; 

import { Booking } from "../Model/Booking"; 
import { Hotel } from "../Model/HotelModel";

export async function deleteBooking(bookingId: string) {
    
    try {
        const booking = await Booking.findByIdAndDelete(bookingId);
        console.log(booking); 
        
        if (!booking) {
            throw new Error('Error 001: Booking not found');
        }
        
    } catch (error) {
        
        if (error instanceof Error) {
            console.error('Error retrieving booking by ID:', error.message);
        } else {
            console.error('An unexpected error occurred:', error);
        }
        throw error;
    }
}

export async function createBooking(hotelID: string, user: string, from_date: string, to_date: string, cost: number){
  
  let date1 = new Date(from_date); 
  let date2 = new Date(to_date); 
  let days = Math.round((date2.getTime()-date1.getTime()) /(1000*3600*24));
  console.log(days); 
  const calculatedCost = cost * days; 
  await Booking.create({
    hotel: hotelID, 
    user: user, 
    from_date: from_date, 
    to_date: to_date,
    cost: calculatedCost
  }); 
}

export async function getBookingForUser(username: string) {
  const bookings = await Booking.find({username: username});
  console.log(bookings);
  var formattedBookings = []
  for(let booking of bookings) {
    console.log(booking); 
    const hotel = await Hotel.findById(booking.hotel); 
    const formattedBooking = {
      id: booking.id,
      hotel: hotel.display.title, 
      user: booking.user, 
      to_date: booking.to_date, 
      from_date: booking.from_date, 
      cost: booking.cost
    }; 
    formattedBookings.push(formattedBooking); 
  }
  return formattedBookings; 
}
