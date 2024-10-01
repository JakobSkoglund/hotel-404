import { getHotels } from "../controllers/hotelController";

import express from "express"; 

const hotelRouter = express.Router(); 

hotelRouter.get("/getHotels", async function(req, res){
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

hotelRouter.get("/hotelDetails", async (req, res) => {
  res.send("hello from hotels :)");  
})

export default hotelRouter; 
