import mongoose from "mongoose"; 

export const hotelSchema = new mongoose.Schema({
  city: {
    type: String, 
    required: true
  }, 
  price: {
    type: Number,  
    required: true
  }, 
  image: {
    type: [String], 
  }, 
  description: {
    type: String, 
    required: true
  }, 
  title: {
    type: String, 
    required: true, 
    index: true
  }, 
}); 

