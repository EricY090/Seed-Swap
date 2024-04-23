import { Router } from "express";
import { usersData } from "../data/index.js";
import xss from "xss";
import bcryptjs from "bcryptjs";
import usersValidation from "../usersValidation.js";

const router = Router();

//for now we'll just have the login post route serve json instead of redirecting to another page

router
.get(async (req, res) => {
  return res.render('home/homepage')
});

router
.route('/register')
.get(async(req,res) =>{//for when a user gets the register page
  try{
    res.render('auth/register', {hid:"hidden"} );
  }
  catch(e){
    return res.status(e.statusCode).send(e.message);
  }
})
.post(async (req, res) => {
  console.log(req.body)
  const { username, password, confirmPassword, DWishlist, countryCode, discord, phoneNumber, email } = req.body;
  let displayWL = false;
  if(DWishlist == 'on'){
    displayWL = true;
  }
  if (!username || !password || !confirmPassword || !countryCode) {
    return res.status(400).render('auth/register',{ error: "fields incomplete" , hid:"" });
  }
  if (typeof username !== "string" || typeof password !== "string" || typeof confirmPassword != "string" || typeof countryCode != "string") {
    return res.status(400).render('auth/register',{ error: "fields not strings" , hid:"" });
  }
  if (username !== xss(username)) {
    return res.status(400).render('auth/register',{ error: "username is an xss vulnerability" , hid:"" });
  }
  if (password !== xss(password)) {
    return res.status(400).render('auth/register',{ error: "password is an xss vulnerability" , hid:"" });
  }
  if (confirmPassword != xss(confirmPassword)){
    return res.status(400).render('auth/register', {error: "Confirm Password is an xss vulnerability" , hid:""});
  }
  if (confirmPassword != password){
    return res.status(400).render('auth/register', {error: "Password and Confirm Password must be the same" , hid:""});
  }
  if (countryCode != xss(countryCode)){
    return res.status(400).render('auth/register', {error: "Country Code is an xss vulnerability" , hid:""});
  }
  if(discord){
    if (discord != xss(discord)){
      return res.status(400).render('auth/register', {error: "Discord is an xss vulnerability" , hid:""});
    }
  }
  if(phoneNumber){
    if (phoneNumber != xss(phoneNumber)){
      return res.status(400).render('auth/register', {error: "Phone Number is an xss vulnerability" , hid:""});
    }
  }
  if(email){
    if (email != xss(email)){
      return res.status(400).render('auth/register', {error: "Email is an xss vulnerability" , hid:""});
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
    return res.status(400).render('auth/register',{error: e , hid:""});
  }
  try{
    let registerInfo = await usersData.createUser(false, username, displayWL, countryCode, discord, phoneNumber, email, password);
    if(registerInfo){
      res.redirect('/login'); 
    }
    else{
      return res.status(400).render('auth/register',{error: "Something went wrong with the server" , hid:""});
    }
  }
  catch(e){
    return res.status(400).render('auth/register',{error: "Something went wrong with the server" , hid:""}); //no errror checking yet so ignore this for now. REGISTER USER NOT WORKING RN
  }
  
});

router
.route('/login')
.get(async(req,res) =>{ //for when a user gets the login page
  try{
    res.render('auth/login', {hid:"hidden"});
  }
  catch(e){
    return res.status(e.statusCode).send(e.message);
  }
})
.post(async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).render('auth/login',{ error: "fields incomplete" , hid:""});
  }
  if (typeof username !== "string" || typeof password !== "string") {
    return res.status(400).render('auth/login',{ error: "fields not strings", hid:"" });
  }
  if (username !== xss(username)) {
    return res.status(400).render('auth/login',{ error: "username is an xss vulnerability" , hid:""});
  }
  if (password !== xss(password)) {
    return res.status(400).render('auth/login',{ error: "password is an xss vulnerability", hid:"" });
  }
  try {
    usersValidation.validateUsername(username);
    usersValidation.validatePassword(password);
  } catch (error) {
    // some error in validation will be printed here
    return res.status(400).render('auth/login', { error: error , hid:""});
  }
  let foundUser;
  try {
    // found user returns user object WITH HASHED PASSWORD
    //could throw a bunch of things, b
    foundUser = await usersData.login(username, password);
  } catch (error) {
    return res.status(400).render('auth/login',{ error: "Username or password incorrect", hid:"" });
  }
  if (foundUser) {
    //usersData.login should only ever return a user object or throw an error. so this is just overkill
    req.session.user = foundUser;
    console.log(req.session.user);
    res.redirect('/homepage') // if the user login works and the user is logged in, then we redirect to homepage (homepage is essentialy empty rn)
  } else {
    return res.status(400).render('auth/login',{ error: "Username or password incorrect", hid:"" });
  }
});

router
.route('/logout')
.get(async(req, res) => {
  return res.render('auth/logout');
});
export default router;
