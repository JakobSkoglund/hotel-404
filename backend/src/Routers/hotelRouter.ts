import { getHotels } from "../controllers/hotelController"; 
import express from "express"; 

const router = express.Router(); 

router.get("/api/hotels", (req, res) => {
  const city = req.body.city;
  const fromDate = req.body.fromDate; 
  const toDate = req.body.toDate; 
  const result = getHotels(city, fromDate, toDate); 
  res.send(JSON.stringify(result)); 
})

export default router; 
