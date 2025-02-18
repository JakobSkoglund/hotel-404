import { Router } from "express";
import { createHotel, getHotels, getAllHotels, getHotelDocumentById, getHotelByQuery } from "../controllers/hotelController";
import { authenticateJWT, authorizeRole } from "../middleware/authMiddleware";

const hotelRouter = Router();  // Use Express Router

// Test API just to see if we have connection to server
// API-Call:   POST http://localhost:7703/api/hotels/test
hotelRouter.post("/test", async function(req, res) {
    console.log("Hotel-service test");
    res.status(200).send("Hotel-service Server is running!");  // Send a response back to confirm the connection
});

// Get all hotels
hotelRouter.get("/all", getAllHotels);

// Get available hotels based on city and date range
hotelRouter.get("/getHotels", getHotels);

// Get hotel details by ID
hotelRouter.get("/hotelDetails", getHotelByQuery);

// Create a new hotel
hotelRouter.post("/", authenticateJWT, authorizeRole("admin"), createHotel);

export default hotelRouter;
