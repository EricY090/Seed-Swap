//Forms
let singin = document.getElementById('signin-form');
let signup = document.getElementById('signup-form');
//

//Form Inputs
let username = document.getElementById('username');
let password = document.getElementById('password');
let confirmPassword = document.getElementById('confirmPassword');
let favoriteQuote = document.getElementById('countryCode');
let themePreference = document.getElementById('discord');
let email = document.getElementById('email');
let phoneNumber = document.getElementById('phoneNumber');
//

//Error Fields
let errorLogin = document.getElementById('errorLogin')
let errorRegister = document.getElementById('errorRegister');
//

//Extra Fields
let emessage = "";
//


//Register Validation
if(signup){
    console.log("Balls")
    signup.addEventListener('submit', (event) =>{
        errorRegister.hidden = true;
        if (!username || !password || !confirmPassword || !countryCode) {
            emessage += "fields incomplete, please fill out all fields with a * next to them"
          }
          if (typeof username !== "string" || typeof password !== "string" || typeof confirmPassword != "string" || typeof countryCode != "string") {
            emessage += "fields not strings"
          }
          if (username !== xss(username)) {
            emessage += "username is an xss vulnerability" 
          }
          if (password !== xss(password)) {
            emessage += "password is an xss vulnerability" 
          }
          if (confirmPassword != xss(confirmPassword)){
            emessage += "Confirm Password is an xss vulnerability"
          }
          if (confirmPassword != password){
            emessage += "Password and Confirm Password must be the same"
          }
          if (countryCode != xss(countryCode)){
            emessage += "Country Code is an xss vulnerability"
          }
          if(discord){
            if (discord != xss(discord)){
              emessage += "Discord is an xss vulnerability"
            }
          }
          if(phoneNumber){
            if (phoneNumber != xss(phoneNumber)){
                emessage += "Phone Number is an xss vulnerability"
            }
          }
          if(email){
            if (email != xss(email)){
                emessage += "Email is an xss vulnerability"
            }
          }

          if (emessage.length > 0) {
            //console.log(emessage.length)
            //console.log("balls3")
            errorRegister.innerHTML = emessage;
            errorRegister.hidden = false;
            emessage = "";
        }
    })
}