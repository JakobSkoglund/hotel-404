import { deleteBooking, createBooking, getBookingForUser } from "../controllers/booking";
import { authenticateJWT } from "../../user-service/src/middleware/authMiddleware";
import express from 'express';

const bookingRouter = express.Router();

// Route to create a booking with JWT authentication
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


// Route to delete a booking by ID
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

export default bookingRouter;
