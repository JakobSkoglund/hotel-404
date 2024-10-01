import { AuthLogin, newUser, deleteUser } from "../controllers/userController"; 

import express from "express"; 
const userRouter = express.Router(); 

userRouter.post("/login", async function(req, res){
  console.log("hello world"); 
  const username = req.body.username; 
  const password = req.body.password; 
  try {
    const validUser = await AuthLogin(username, password); 
    res.sendStatus(200);
  }
  catch (error) {
    res.status(400).send(error)
    console.log("Jag är här");
  }
  
});   


userRouter.post("/signup", async function(req, res){
  const username = req.body.username; 
  const password = req.body.password; 
  const firstName = req.body.firstName; 
  const lastName = req.body.lastName; 
  const age = req.body.age; 
  const isAdmin = false; 
  try {
    const createUser = await newUser(firstName, lastName, username, age, password, isAdmin);
    res.status(201); 
  }
  catch{
    res.status(400); 
  }
})


userRouter.delete("/deleteme", async function(req, res){
  const userID = req.body.userID;

  try {
    const userDelete = await deleteUser(userID);
    res.status(201);
  }
  catch {
    res.status(400);
  }
});


userRouter.get("/", (req, res) => {
  res.send({"msg":"hello world"}); 
})
export default userRouter;


