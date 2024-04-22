import { Router } from "express";
import { usersData } from "../data/index.js";
import xss from "xss";
import bcryptjs from "bcryptjs";
import usersValidation from "../usersValidation.js";

const router = Router();

//for now we'll just have the login post route serve json instead of redirecting to another page

router
.get(async (req, res) => {
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
  const { username, password, confirmPassword, DWishlist, countryCode, discord, phoneNumber, email } = req.body;
  let displayWL = false;
  if(DWishlist == 'on'){
    displayWL = true;
  }
  if (!username || !password || !confirmPassword || !countryCode) {
    res.status(400).render('login',{ error: "fields incomplete" });
    return;
  }
  if (typeof username !== "string" || typeof password !== "string" || typeof confirmPassword != "string" || typeof countryCode != "string") {
    res.status(400).render('login',{ error: "fields not strings" });
    return;
  }
  if (username !== xss(username)) {
    res.status(400).render('register',{ error: "username is an xss vulnerability" });
    return;
  }
  if (password !== xss(password)) {
    res.status(400).render('register',{ error: "password is an xss vulnerability" });
    return;
  }
  if (confirmPassword != xss(confirmPassword)){
    res.status(400).render('register', {error: "Confirm Password is an xss vulnerability"});
  }
  if (confirmPassword != password){
    res.status(400).render('register', {error: "Password and Confirm Password must be the same"});
  }
  if (DWishlist != xss(DWishlist)){
    res.status(400).render('register', {error: "Display Wishlist is an xss vulnerability"});
  }
  if (countryCode != xss(countryCode)){
    res.status(400).render('register', {error: "Country Code is an xss vulnerability"});
  }
  if(discord){
    if (discord != xss(discord)){
      res.status(400).render('register', {error: "Discord is an xss vulnerability"});
    }
  }
  if(phoneNumber){
    if (phoneNumber != xss(phoneNumber)){
      res.status(400).render('register', {error: "Phone Number is an xss vulnerability"});
    }
  }
  if(email){
    if (email != xss(email)){
      res.status(400).render('register', {error: "Email is an xss vulnerability"});
    }
  }
  try{
    usersValidation.validateUsername(username);
    usersValidation.validatePassword(password);
    usersValidation.validatePassword(confirmPassword);
    usersValidation.validateCountryCode(countryCode);
    if(discord){
      usersValidation.validateDiscord(discord);
    }
    if(phoneNumber){
      usersValidation.validatePhoneNumber(phoneNumber);
    }
    if(email){
      usersValidation.validateEmail(email);
    }
  }
  catch(e){
    return res.status(400).render('register',{error: e});
  }
  try{
    let registerInfo = await usersData.createUser(false, username, displayWL, countryCode, discord, phoneNumber, email, password);
    if(registerInfo){
      res.redirect('/login'); 
    }
    else{
      return res.status(400).render('register',{error: "Something went wrong with the server"});
    }
  }
  catch(e){
    return res.status(400).render('register',{error: "Something went wrong with the server"}); //no errror checking yet so ignore this for now. REGISTER USER NOT WORKING RN
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
    res.status(400).render('login',{ error: "fields incomplete" });
    return;
  }
  if (typeof username !== "string" || typeof password !== "string") {
    res.status(400).render('login',{ error: "fields not strings" });
    return;
  }
  if (username !== xss(username)) {
    res.status(400).render('login',{ error: "username is an xss vulnerability" });
    return;
  }
  if (password !== xss(password)) {
    res.status(400).render('login',{ error: "password is an xss vulnerability" });
    return;
  }
  try {
    usersValidation.validateUsername(username);
    usersValidation.validatePassword(password);
  } catch (error) {
    // some error in validation will be printed here
    res.status(400).render('login', { error: error });
    return;
  }
  let foundUser;
  try {
    // found user returns user object WITH HASHED PASSWORD
    //could throw a bunch of things, b
    foundUser = await usersData.login(username, password);
  } catch (error) {
    res.status(400).render('login',{ error: "Username or password incorrect" });
    return;
  }
  if (foundUser) {
    //usersData.login should only ever return a user object or throw an error. so this is just overkill
    req.session.user = foundUser;
    console.log(req.session.user);
    res.redirect('/homepage') // if the user login works and the user is logged in, then we redirect to homepage (homepage is essentialy empty rn)
  } else {
    res.status(400).render('login',{ error: "Username or password incorrect" });
  }
});

router
.route('/logout')
.get(async(req, res) => {
  res.render('logout');
});
export default router;
