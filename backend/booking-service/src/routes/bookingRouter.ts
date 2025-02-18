import { deleteBooking, createBooking, getBookingForUser } from "../controllers/bookingController";
import { authenticateJWT } from "../middleware/authMiddleware";
import {Booking} from "../models/Booking";
import express from 'express';

const bookingRouter = express.Router();

// Test API just to see if we have connection to server
// API-Call:   POST http://localhost:7702/api/booking/test
bookingRouter.post('/test', (req, res) => {
  console.log('Request received in user-service:', req.body);
  
  // Process the request and send a proper response
  res.status(200).json({ message: 'Test successful' });
});


// Route to create a booking with JWT authentication         SEPERATION NOT DONE
bookingRouter.post("/", authenticateJWT, async function(req: any, res){
    const hotelID = req.body.hotelID;
    const username = req.user.username;
    const from_date = req.body.from_date;
    const to_date = req.body.to_date;

    try {
        const bookingDone = await createBooking(hotelID, username, from_date, to_date);
        
        res.status(201).send("booking successful!");
    } catch (error){
        res.status(400).send(error);
    }
});


// Route to delete a booking by ID.         SEPERATION DONE
bookingRouter.delete("/", async function(req, res) {

    const bookingId = req.body.bookingId;

    try {
        const bookingDeleted = await deleteBooking(bookingId);
        res.status(200).send();
    } catch {
        res.status(400).send();
    }
});

// Route to get bookings for the authenticated users
bookingRouter.get("/", authenticateJWT, async function(req: any, res){

    const username = req.query.username;  // Extract username from query parameters

    if (!username) {
        return res.status(400).json({ message: "Username is required" });
    }
    const bookings = await getBookingForUser(username);
    res.send(bookings).status(200); 
})


bookingRouter.delete("/deleteBookings/:username", async (req, res) => {
    try {
        const { username } = req.params;
        await Booking.deleteMany({ user: username });
        return res.status(200).json({ message: "Bookings deleted successfully" });
    } catch (error) {
        console.error("Error deleting bookings:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});


export default bookingRouter;
