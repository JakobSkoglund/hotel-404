import mongoose from "mongoose"; 

const DB_URI = process.env.DB_URI as string;

mongoose.connect(DB_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
