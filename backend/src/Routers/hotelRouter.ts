import { getHotels } from "../controllers/hotelController";

import express from "express"; 

const router = express.Router(); 

router.get("/api/hotels", async (req, res) => {
  const city = req.body.city;
  const fromDate = req.body.fromDate; 
  const toDate = req.body.toDate;

  if(!fromDate|| !toDate){
    res.status(400).send('invalid request');
    return; 
  }
  const result = await getHotels(city, fromDate, toDate);
  console.log(result); 
  res.send(JSON.stringify(result)).status(200); 
})

router.get("/api/hotelDetails", async (req, res) => {

})

export default router; 
