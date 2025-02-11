import { deleteBooking, createBooking, getBookingForUser } from "../controllers/bookingController";
import { authenticateJWT } from "../../user-service/src/middleware/authMiddleware";
import {Booking} from "../models/Booking";
import express from 'express';
import { logger } from "../../Logging/logger";

const bookingRouter = express.Router();

// Route to create a booking with JWT authentication         SEPERATION NOT DONE
bookingRouter.post("/", authenticateJWT, async function(req: any, res){
    const hotelID = req.body.hotelID;
    const username = req.user.username;
    const from_date = req.body.from_date;
    const to_date = req.body.to_date;

    logger.info(`Creating booking for user: ${username}, hotelID: ${hotelID}, from: ${from_date}, to: ${to_date}`);

    try {
        const bookingDone = await createBooking(hotelID, username, from_date, to_date);
        logger.info(`Booking successful for user: ${username} at hotelID: ${hotelID}`);
        logger.info('');
        res.status(201).send("booking successful!");
    } catch (error: any){
        logger.error(`Error creating booking for user: ${username}. Error: ${error.message}`);
        logger.info('');
        res.status(400).send(error);
    }
});


// Route to delete a booking by ID.         SEPERATION DONE
bookingRouter.delete("/", async function(req, res) {

    const bookingId = req.body.bookingId;
    logger.info(`Deleting booking with ID: ${bookingId}`);

    try {
        const bookingDeleted = await deleteBooking(bookingId);
        logger.info(`Booking deleted with ID: ${bookingId}`);
        logger.info('');
        res.status(200).send();
    } catch (error: any){
        logger.error(`Error deleting booking with ID: ${bookingId}. Error: ${error.message}`);
        logger.info('');
        res.status(400).send(error);
    }
});

// Route to get bookings for the authenticated users
bookingRouter.get("/", authenticateJWT, async function(req: any, res){

    const username = req.query.username;  // Extract username from query parameters

    if (!username) {
        logger.warn('Username is required in the query parameters.');
        logger.info('');
        return res.status(400).json({ message: "Username is required" });
    }
    logger.info(`Fetching bookings for user: ${username}`);
    try {
        const bookings = await getBookingForUser(username);
        logger.info(`Fetched bookings for user: ${username}`);
        logger.info('');
        res.send(bookings).status(200); 
    } catch (error: any) {
        logger.error(`Error fetching bookings for user: ${username}. Error: ${error.message}`);
        logger.info('');
        res.status(500).send({ message: "Internal server error" });
    }
})


bookingRouter.delete("/deleteBookings/:username", async (req, res) => {

    const { username } = req.params;
    logger.info(`Deleting all bookings for user: ${username}`);

    try {
        await Booking.deleteMany({ user: username });
        logger.info(`All bookings deleted for user: ${username}`);
        logger.info('');
        return res.status(200).json({ message: "Bookings deleted successfully" });
    } catch (error: any) {
        logger.error(`Error deleting bookings for user: ${username}. Error: ${error.message}`);
        logger.info('');
        return res.status(500).json({ error: "Internal server error" });
    }
});


export default bookingRouter;
