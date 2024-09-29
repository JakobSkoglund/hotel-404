// src/index.js

import express from "express"; 
import mongoose from "mongoose";

const Hotel = require('./models/HotelModel');
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
