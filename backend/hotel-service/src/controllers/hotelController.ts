import { Booking } from "../../../src/Model/Booking"; 
import { Hotel } from "../../../src/Model/HotelModel"; 
import { Request, Response } from "express";

// Fetch hotels, optionally filtered by city, and return only those available between the given dates
export const getHotels = async (req: Request, res: Response) => {
    try {
      const city = typeof req.query.city === "string" ? req.query.city : null;
      const fromDate = typeof req.query.dateCheckIn === "string" ? req.query.dateCheckIn : null;
      const toDate = typeof req.query.dateCheckOut === "string" ? req.query.dateCheckOut : null;
  
    
      if (!fromDate || !toDate) {
        return res.status(400).json({ message: "Check-in and check-out dates are required." });
      }
  
      const checkInDate = new Date(fromDate);
      const checkOutDate = new Date(toDate);
  
      if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
        return res.status(400).json({ message: "Invalid date format. Use YYYY-MM-DD." });
      }
  
      if (checkInDate >= checkOutDate) {
        return res.status(400).json({ message: "Check-out date must be after check-in date." });
      }
  
      let hotels = city ? await Hotel.find({ "display.city": city }) : await Hotel.find();
      
      res.status(200).json(hotels);
    } catch (error) {
      res.status(500).json({ message: "Error fetching available hotels", error });
    }
};

// Check if a hotel is available between the given dates
const hotelFreeBetweenDates = async (hotel: any, fromDate: Date, toDate: Date) => {
    const bookings = await Booking.find({ hotel: hotel._id });
  
    for (let booking of bookings) {
      const bookingFromDate = new Date(booking.from_date);
      const bookingToDate = new Date(booking.to_date);
  
      if (fromDate <= bookingToDate && bookingFromDate >= fromDate) {
        return false;
      }
    }
    return true;
  };

  export const getAllHotels = async (_req: Request, res: Response) => {
    try {
      const hotels = await Hotel.find();
      res.status(200).json(hotels);
    } catch (error) {
      res.status(500).json({ message: "Error fetching hotels", error });
    }
  };
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
export const getHotelByQuery = async (req: Request, res: Response) => {
  try {
    const hotelId = req.query.hotelId as string;
    if (!hotelId) {
      return res.status(400).json({ message: "Missing hotelId parameter" });
    }
    // Fetch hotel details using the helper function getHotelDocumentById
    const hotel = await getHotelDocumentById(hotelId);

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

     // Return the hotel via API response (not just as a function return)
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving hotel", error });
  }
};
// Create a new hotel record
export const createHotel = async (req: Request, res: Response) => {
    try {
      const hotel = await Hotel.create(req.body);
      res.status(201).json({ message: "Hotel created successfully", hotel });
    } catch (error) {
      res.status(500).json({ message: "Error creating hotel", error });
    }
  };


