import mongoose from "mongoose"; 

const hotelSchema = new mongoose.Schema({
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
    required: true
  }, 
  description: {
    type: String, 
    required: true
  }, 
  title: {
    type: String, 
    required: true
  }, 
  key: {
    type: String, 
    required: true
  }, 
})

export default hotelSchema; 
