import { AuthLogin, newUser } from "../controllers/userController"; 

import express from "express"; 
const userRouter = express.Router(); 

userRouter.post("/login", async function(req, res){
  console.log("hello world"); 
  const username = req.body.username; 
  const password = req.body.password; 
  const validUser = await AuthLogin(username, password); 
  if(validUser){
    console.log(req.session); 
    res.sendStatus(200); 
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

userRouter.get("/", (req, res) => {
  res.send({"msg":"hello world"}); 
})
export default userRouter;


