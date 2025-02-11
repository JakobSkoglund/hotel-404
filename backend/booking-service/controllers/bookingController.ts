import { Booking } from "../models/Booking"; 
import { Hotel } from "../../src/Model/HotelModel";
import { logger} from "../../Logging/logger";


// Function to delete a booking by its ID
export async function deleteBooking(bookingId: string) {
    
    try {
        const booking = await Booking.findByIdAndDelete(bookingId);
        
        if (!booking) {
            logger.error(`Error: Booking with ID ${bookingId} not found`);
            throw new Error('Error 001: Booking not found');
        }
        
    } catch (error) {
        
        if (error instanceof Error) {
            logger.error(`Error retrieving booking by ID: ${bookingId},  ${error.message}`);
        } else {
            logger.error('An unexpected error occurred:', error);
        }
        throw error;
    }
}


// Function to create a new booking
export async function createBooking(hotelID: string, user: string, from_date: string, to_date: string){ 

  logger.info(`Creating booking for user: ${user}, hotelID: ${hotelID}, from: ${from_date}, to: ${to_date}`);


  let date1 = new Date(from_date); 
  let date2 = new Date(to_date); 
  let days = Math.round((date2.getTime()-date1.getTime()) /(1000*3600*24));

  // Need to create API call in Hotel-service that returns values { hotelName: "name" || NULL, price: number }
  let hotel = await Hotel.findById(hotelID);
  if(!hotel){
    logger.error(`Error: Couldn't find hotel with ID: ${hotelID}`);
    throw new Error("couldn't find hotel");
  }

  const timeNow = Date.now(); 
  
  const checkInDate = date1.toISOString().split('T')[0]; 
  const checkOutDate = date2.toISOString().split('T')[0]; 


  //If checkout date is less than checkin date, throw an error
  //Also throw an error if either date is before the current time
  if(days < 0){
    logger.error("Error: Checkout date is earlier than check-in date.");
    throw new Error("invalid dates"); 
  } else if(Number(date1) < timeNow || Number(date2) < timeNow){
    logger.error("Error: One or both dates are in the past.");
    throw new Error("invalid dates"); 
  }

  const cost = hotel.display?.price;

  if(!cost){
    logger.error("Error: Couldn't retrieve hotel price.");
    throw new Error("Couldn't get hotel price"); 
  }

  const calculatedCost = cost * days; 


    try {
        await Booking.create({
            hotel: hotelID, 
            user: user, 
            from_date: checkInDate, 
            to_date: checkOutDate,
            cost: calculatedCost
        });
        logger.info(`Booking created successfully for user: ${user} at hotelID: ${hotelID}`);
    } catch (error: any) {
        logger.error(`Error creating booking: ${error.message}`);
        throw error;
    }
}
// Function to retrieve bookings for a specific user
export async function getBookingForUser(username: string) {

  logger.info(`Fetching bookings for user: ${username}`);


  const bookings = await Booking.find({user: username});
  var formattedBookings = []
  for(let booking of bookings) {
  // Need to create API call in Hotel-service that returns values { hotelName: "name" || NULL, price: number }
    const hotel = await Hotel.findById(booking.hotel);

    if (!hotel) {
      logger.warn(`Warning: Hotel data not found for booking ID: ${booking.id}`);
    }

      const formattedBooking = {
        id: booking.id,
        hotel: hotel?.display?.title, 
        user: booking.user, 
        to_date: booking.to_date.split("T")[0], 
        from_date: booking.from_date.split("T")[0], 
        cost: booking.cost
      }; 

      formattedBookings.push(formattedBooking); 
  }
  logger.info(`Fetched ${formattedBookings.length} bookings for user: ${username}`);
  return formattedBookings; 
}
