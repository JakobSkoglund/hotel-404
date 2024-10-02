import { AuthLogin, newUser, deleteUser } from "../controllers/userController"; 

import express from "express"; 
const userRouter = express.Router(); 

userRouter.post("/login", async function(req, res, next){
  console.log("hello world"); 
  const username = req.body.username; 
  const password = req.body.password; 
  try {
    const validUser = await AuthLogin(username, password);    
    req.session.isLoggedIn = true;
    req.session.username = username;
    console.log(req.session.username); 
    console.log(req.session);
    req.session.save(() => {
      return req.session.username; 
    }); 
    res.sendStatus(200);
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
  const firstName = req.body.firstName; 
  const lastName = req.body.lastName; 
  const age = req.body.age; 
  const isAdmin = false; 
  try {
    const createUser = await newUser(firstName, lastName, username, age, password, isAdmin);
    res.sendStatus(201); 
    req.session.username = username;
    req.session.isLoggedIn = true; 
  }
  catch{
    res.sendStatus(400); 
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

userRouter.get("/session", (req, res) => {
  if(req.body.username === req.session.username){
    res.sendStatus(200); 
  }
  else {
    res.sendStatus(400); 
  }
})

