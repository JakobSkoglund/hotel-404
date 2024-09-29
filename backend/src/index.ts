// src/index.js
// för att köra: PS C:\Users\David\Desktop\Skola\WA\hotel-404\backend\src> npx tsx index.ts
import express from "express"; 
import mongoose from "mongoose";
import { Hotel } from "./Model/HotelModel";
import { getHotelDocumentById, getHotelDocumentByName } from './Controllers/HotelController'

const app = express(); 

// Parse incoming JSON request.
app.use(express.json()); 

const router = express.Router(); 

const mongoURI = 'mongodb+srv://Cluster46730:VE9vWGN0YkFm@cluster46730.bv6pq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster46730'

mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });


//TEST getDocumentByID/Name

async function testGetHotelById(hotelId: string) 
{
  try 
  {
    const hotel = await getHotelDocumentById(hotelId);
    console.log('Hotel retrieved by ID:', hotel);
  } 
  catch (error) 
  {
  
  }
}

async function testGetHotelByName(hotelId: string) 
{
  try 
  {
    const hotel = await getHotelDocumentById(hotelId);
    console.log('Hotel retrieved by ID:', hotel);
  } 
  catch (error) 
  {
    
  }
}

const hotelIdToTest = '66f7fb34c6cb069d99d6998e'; // Change to test
const hotelNameToTest = 'Hotel Try'; // Change to test

testGetHotelById(hotelIdToTest);
testGetHotelByName(hotelNameToTest);

//END OF TEST getDocumentByID/Name





// TEST BLOCK
const jsonTest = {
  message: "Hello, world!", 
  state: 500, 
  app: "Hotel 404"
}; 

app.use(router); 

app.get('/', (req, res) => {
  res.send(jsonTest); 
})
// END OF TEST BLOCK

// Start server
app.listen(7700, () => {
  console.log("Listening on port 7700"); 
}); 
