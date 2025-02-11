import { Router } from "express";
import { createHotel, getHotels, getAllHotels, getHotelByQuery } from "../controllers/hotelController";
import { authenticateJWT, authorizeRole } from "../middleware/authMiddleware";

const hotelRouter = Router();

// Get all hotels
hotelRouter.get("/all", getAllHotels);

// Get available hotels based on city and date range
hotelRouter.get("/getHotels", getHotels);

// Get hotel details by ID (expecting `hotelId` as param)
hotelRouter.get("/hotelDetails", getHotelByQuery);

// Create a new hotel (only admin access)
hotelRouter.post("/", authenticateJWT, authorizeRole("admin"), createHotel);

export default hotelRouter;

