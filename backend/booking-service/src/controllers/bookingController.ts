import { Booking } from "../models/Booking"; 
import axios from "axios";


// Function to delete a booking by its ID
export async function deleteBooking(bookingId: string) {
    
    try {
        const booking = await Booking.findByIdAndDelete(bookingId);
        
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


// Function to create a new booking
export async function createBooking(hotelID: string, user: string, from_date: string, to_date: string){ 
  let date1 = new Date(from_date); 
  let date2 = new Date(to_date); 
  let days = Math.round((date2.getTime()-date1.getTime()) /(1000*3600*24));




  let hotelTitle = ""; // Declare variable outside
  let hotelPrice = 0;  // Default value for price

  // Api call that get hotelData
  const response = await axios.get(`http://api-gateway:7700/api/hotels/hotelDetails`, {
    params: { hotelId : hotelID }
  });

    const hotelData = response.data;

    hotelTitle = hotelData.display.title;
    hotelPrice = hotelData.display.price;

  const timeNow = Date.now(); 
  
  const checkInDate = date1.toISOString().split('T')[0]; 
  const checkOutDate = date2.toISOString().split('T')[0]; 
  //If checkout date is less than checkin date, throw an error
  //Also throw an error if either date is before the current time
  if(days < 0){
    throw new Error("invalid dates"); 
  } else if(Number(date1) < timeNow || Number(date2) < timeNow || Number(date2) < Number(date1)){
    throw new Error("invalid dates"); 
  }
  
  const cost = hotelPrice;
  if(!cost){
    throw new Error("Couldn't get hotel price"); 
  }
  const calculatedCost = cost * days; 
  await Booking.create({
    hotel: hotelID, 
    user: user, 
    from_date: checkInDate, 
    to_date: checkOutDate,
    cost: calculatedCost
  });
}
// Function to retrieve bookings for a specific user
export async function getBookingForUser(username: string) {
  const bookings = await Booking.find({user: username});
  var formattedBookings = []
  for(let booking of bookings) {


  // Need to create API call in Hotel-service that returns values { hotelName: "name" || NULL, price: number }

  let hotelTitle = ""; // Declare variable outside
  let hotelPrice = 0;  // Default value for price

  // Api call that get hotelData
  const response = await axios.get(`http://api-gateway:7700/api/hotels/hotelDetails`, {
    params: { hotelId : booking.hotel }
  });

    const hotelData = response.data;

    hotelTitle = hotelData.display.title;
    hotelPrice = hotelData.display.price;



  //const hotel = await Hotel.findById(booking.hotel);


    const formattedBooking = {
      id: booking.id,
      hotel: hotelTitle, 
      user: booking.user, 
      to_date: booking.to_date.split("T")[0], 
      from_date: booking.from_date.split("T")[0], 
      cost: booking.cost
    }; 
    formattedBookings.push(formattedBooking); 
  }
  return formattedBookings; 
}
