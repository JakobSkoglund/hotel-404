import { Hotel } from "../../../src/Model/HotelModel"; 
import { Request, Response } from "express";

// Fetch hotels, optionally filtered by city, and return only those available between the given dates
export const getHotels = async (req: Request, res: Response) => {
  try {
      console.log("🔎 Incoming request to /api/hotels/getHotels");
      console.log("Query params:", req.query);

      const city = typeof req.query.city === "string" ? req.query.city : null;
      const fromDate = typeof req.query.dateCheckIn === "string" ? req.query.dateCheckIn : null;
      const toDate = typeof req.query.dateCheckOut === "string" ? req.query.dateCheckOut : null;

      console.log("Parsed params -> City:", city, "From:", fromDate, "To:", toDate);

      if (!fromDate || !toDate) {
          console.log("❌ Missing dates!");
          return res.status(400).json({ message: "Check-in and check-out dates are required." });
      }

      const checkInDate = new Date(fromDate);
      const checkOutDate = new Date(toDate);

      if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
          console.log("❌ Invalid date format!");
          return res.status(400).json({ message: "Invalid date format. Use YYYY-MM-DD." });
      }

      if (checkInDate >= checkOutDate) {
          console.log("❌ Check-out date must be after check-in date!");
          return res.status(400).json({ message: "Check-out date must be after check-in date." });
      }

      console.log("✅ Searching for hotels...");

      let hotels;
      if (city) {
          hotels = await Hotel.find({ "display.city": city });
      } else {
          hotels = await Hotel.find();
      }

      console.log("🏨 Found hotels:", hotels);
      res.status(200).json(hotels);
  } catch (error) {
      console.error("❌ Error fetching available hotels:", error);
      if (error instanceof Error) {
        // Skicka tillbaka felmeddelandet från Error-objektet
        res.status(500).json({ message: "Error fetching available hotels", error: error.message });
    } else {
        // Om error inte är av typen Error, skicka ett generiskt felmeddelande
        res.status(500).json({ message: "Error fetching available hotels", error: "An unknown error occurred" });
    }

  }
}; 


export const getAllHotels = async (_req: Request, res: Response) => {
  try {
    console.log("Fetching all hotels...");

    // Försök att hämta alla hotell från databasen
    const hotels = await Hotel.find();
    console.log("Hotels fetched successfully:", hotels);

    res.status(200).json(hotels);
  } catch (error: unknown) {
    // Kontrollera om felet är ett Error-objekt innan du försöker komma åt dess egenskaper
    if (error instanceof Error) {
      // Logga detaljerat felmeddelande och stack-trace om det finns
      console.error("Error occurred while fetching hotels:", error.message);
      console.error("Stack trace:", error.stack);

      // Skicka ett användbart felmeddelande till klienten
      res.status(500).json({ message: "Error fetching hotels", error: error.message });
    } else {
      // Hantera okända fel
      console.error("Unknown error occurred:", error);
      res.status(500).json({ message: "An unknown error occurred", error: String(error) });
    }
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


