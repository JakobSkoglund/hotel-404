// src/index.js

import express from "express"; 
import mongoose from "mongoose";

const Hotel = require('./models/Hotel');
const app = express(); 

// Parse incoming JSON request.
app.use(express.json()); 

const router = express.Router(); 






















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
