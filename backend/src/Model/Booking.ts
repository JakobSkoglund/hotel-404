import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  id: {
    type: Number, 
    required: true
  }, 
  user: {
    type: String, 
    required: true
  }, 
  from_date: {
    type: String, 
    required: true
  }, 
  to_date: {
    type: String, 
    required: true
  },
  cost: {
    type: Number, 
    required: true
  }
}); 

export default bookingSchema; 
