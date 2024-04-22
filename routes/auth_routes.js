import { Router } from "express";
import { usersData } from "../data/index.js";
import xss from "xss";
import bcryptjs from "bcryptjs";
import usersValidation from "../usersValidation.js";

const router = Router();

//for now we'll just have the login post route serve json instead of redirecting to another page

router
.get(async (req, res) => {
  //code here for GET THIS ROUTE SHOULD NEVER FIRE BECAUSE OF MIDDLEWARE #1 IN SPECS.
  return res.render('homepage')
});

router
.route('/register')
.get(async(req,res) =>{//for when a user gets the register page
  try{
    res.render('register');
  }
  catch(e){
    return res.status(e.statusCode).send(e.message);
  }
})
.post(async (req, res) => {
  try{
    let registerInfo = await usersData.createUser(false, req.body.username, true, req.body.countryCode, req.body.discord, req.body.phoneNumber, req.body.email, req.body.password);
    res.redirect('/login'); 
  }
  catch(e){
    console.log("balls");
    return res.status(400).render('register',{error: req.params}); //no errror checking yet so ignore this for now. REGISTER USER NOT WORKING RN
  }
  
});

router
.route('/login')
.get(async(req,res) =>{ //for when a user gets the login page
  try{
    res.render('login');
  }
  catch(e){
    return res.status(e.statusCode).send(e.message);
  }
})
.post(async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ error: "fields incomplete" });
    return;
  }
  if (typeof username !== "string" || typeof password !== "string") {
    res.status(400).json({ error: "fields not strings" });
    return;
  }
  if (username !== xss(username)) {
    res.status(400).json({ error: "username is an xss vulnerability" });
    return;
  }
  if (password !== xss(password)) {
    res.status(400).json({ error: "password is an xss vulnerability" });
    return;
  }
  try {
    usersValidation.validateUsername(username);
    usersValidation.validatePassword(password);
  } catch (error) {
    // some error in validation will be printed here
    res.status(400).json({ error: error });
    return;
  }
  let foundUser;
  try {
    // found user returns user object WITH HASHED PASSWORD
    //could throw a bunch of things, b
    foundUser = await usersData.login(username, password);
  } catch (error) {
    res.status(400).json({ error: "Username or password incorrect" });
    return;
  }
  if (foundUser) {
    //usersData.login should only ever return a user object or throw an error. so this is just overkill
    req.session.user = foundUser;
    console.log(req.session.user);
    res.redirect('/homepage') // if the user login works and the user is logged in, then we redirect to homepage (homepage is essentialy empty rn)
  } else {
    res.status(400).json({ error: "Username or password incorrect" });
  }
});

router
.route('/logout')
.get(async(req, res) => {
  res.render('logout');
});
export default router;
