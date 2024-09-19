// src/index.js

import express from "express"; 
import mongoose from "mongoose"; 

const app = express(); 

const router = express.Router(); 

const jsonTest = {
  message: "Hello, world!", 
  state: 500, 
  app: "Hotel 404"
}; 

app.use(express.json()); 

app.use(router); 

app.get('/', (req, res) => {
  res.send(jsonTest); 
})

app.listen(7700, () => {
  console.log("Listening on port 7700"); 
}); 
