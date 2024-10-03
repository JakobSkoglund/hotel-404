import { deleteBooking, createBooking, getBookingForUser } from "../controllers/booking";
import { authenticateJWT } from "../controllers/auth";
import express from 'express';

const bookingRouter = express.Router();

bookingRouter.post("/", async function(req, res){
    const hotelID = req.body.hotelID;
    const user = req.body.user;
    const from_date = req.body.from_date;
    const to_date = req.body.to_date;
    const cost = req.body.cost;

    try {
        const bookingDone = await createBooking(hotelID, user, from_date, to_date, cost);
        res.status(201).send("booking successful!");
    } catch (error){
        res.status(400).send(error);
    }
});

bookingRouter.delete("/", async function(req, res) {

    const bookingId = req.body.bookingId;

    try {
        const bookingDeleted = await deleteBooking(bookingId);
        res.status(200).send();
    } catch {
        res.status(400).send();
    }
});

bookingRouter.get("/", async function(req, res){
  console.log("getting bookings..."); 
  const username = req.user; 
  const bookings = await getBookingForUser(username);
  console.log(bookings); 
  res.send(bookings).status(200); 
})

export default bookingRouter;
