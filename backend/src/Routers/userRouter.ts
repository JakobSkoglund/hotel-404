import { AuthLogin, newUser, deleteUser } from "../controllers/userController"; 
import { accessTokenSecret, authenticateJWT } from "../controllers/auth";
import jwt from "jsonwebtoken"; 


import express from "express"; 
const userRouter = express.Router(); 

userRouter.post("/login", async function(req, res, next){
  console.log("hello world"); 
  const username = req.body.username; 
  const password = req.body.password; 
  try {
    const validUser = await AuthLogin(username, password);    
    const accessToken = jwt.sign({username: username}, accessTokenSecret);
    res.cookie('token', accessToken, {httpOnly: true}); 
    res.sendStatus(201); 
    req.session.isLoggedIn = true;
    req.session.username = username;
    console.log(req.session.username); 
    next(); 
  }
  catch (error) {
  console.log(error); 
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
    const accessToken = jwt.sign({username: username}, accessTokenSecret, {expiresIn: "20m"}); 
    res.json({accessToken}).status(201).send(); 
  }
  catch{
    res.sendStatus(400); 
  }
})


userRouter.delete("/deleteme", authenticateJWT, async function(req, res){
  const userID = req.user as string;
    try {
    const userDelete = await deleteUser(userID);
    res.sendStatus(201);
  }
  catch {
    res.sendStatus(400);
  }
});


userRouter.get("/session", authenticateJWT, (req, res) => {
 res.sendStatus(200);  
}); 



export default userRouter;


