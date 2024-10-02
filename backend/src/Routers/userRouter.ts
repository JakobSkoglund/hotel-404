import { AuthLogin, newUser, deleteUser } from "../controllers/userController"; 

import express from "express"; 
const userRouter = express.Router(); 

userRouter.post("/login", async function(req, res, next){
  console.log("hello world"); 
  const username = req.body.username; 
  const password = req.body.password; 
  try {
    const validUser = await AuthLogin(username, password);    
    res.sendStatus(200);
    req.session.isLoggedIn = true;
    req.session.username = username;
    console.log(req.session.username); 
    next(); 
  }
  catch (error) {
    res.status(400).send(error)
    console.log("Jag är här");
  }
  
});   


userRouter.post("/signup", async function(req, res){
  const username = req.body.username; 
  const password = req.body.password; 
  const name = req.body.name; 
  const lastname = req.body.lastname; 
  const age = req.body.age; 
  const isAdmin = false; 
  try {
    const createUser = await newUser(name, lastname, username, age, password, isAdmin);
    res.status(201); 
  }
  catch{
    res.status(400); 
  }
})


userRouter.delete("/deleteme", async function(req, res){
  const userID = req.query.userID as string;

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


