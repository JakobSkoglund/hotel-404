import { createHotel, getHotels, getAllHotels, getHotelDocumentById} from "../controllers/hotelController";

import express from "express";
import { Request } from "express";

const hotelRouter = express.Router(); 

hotelRouter.get("/all", async function(req, res){
  const hotels = await getAllHotels(); 
  res.status(200).send(hotels)
})

hotelRouter.get("/getHotels", async function(req, res){
  const city = req.body.city;
  const fromDate = req.body.fromDate; 
  const toDate = req.body.toDate;

  if(!fromDate || !toDate){
    res.status(400).send('invalid request');
    return; 
  }
  const result = await getHotels(city, fromDate, toDate);
  console.log(result); 
  res.send(JSON.stringify(result)).status(200); 
})

hotelRouter.get("/hotelDetails", async (req: Request<{hotelId: string}>, res) => {
  try{
    const query = req.query.hotelId ? String(req.query.hotelId) : "";
    const hotel = await getHotelDocumentById(query); 
    const result = {
      page: hotel.page, 
      hotel_img: hotel.hotel_img, 
      bath_img: hotel.bath_img, 
      hall_img: hotel.hall_img, 
      other_img: hotel.other_img, 
      food_img: hotel.food_img
    }; 
    res.status(200).send(result); 
  }
  catch{
    res.sendStatus(400);
  }
})


hotelRouter.post("/", async(req, res) => {
  try {
    await createHotel(req.body); 
    res.status(201).send(); 
  }
  catch {
    res.sendStatus(401); 
  }
})
export default hotelRouter; 
