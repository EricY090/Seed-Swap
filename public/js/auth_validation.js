//Forms
let signin = document.getElementById('signin-form');
let signup = document.getElementById('signup-form');
//

//Form Inputs
let username = document.getElementById('username');
let password = document.getElementById('password');
let confirmPassword = document.getElementById('confirmPassword');
let countryCode = document.getElementById('countryCode');
let discord = document.getElementById('discord');
let email = document.getElementById('email');
let phoneNumber = document.getElementById('phoneNumber');
//

//Error Fields
let errorLogin = document.getElementById('errorLogin')
let errorRegister = document.getElementById('errorRegister');
//

//Extra Fields
const countrySet = [
  { name: "Albania", code: "AL" },
  { name: "Åland Islands", code: "AX" },
  { name: "Algeria", code: "DZ" },
  { name: "American Samoa", code: "AS" },
  { name: "Andorra", code: "AD" },
  { name: "Angola", code: "AO" },
  { name: "Anguilla", code: "AI" },
  { name: "Antarctica", code: "AQ" },
  { name: "Antigua and Barbuda", code: "AG" },
  { name: "Argentina", code: "AR" },
  { name: "Armenia", code: "AM" },
  { name: "Aruba", code: "AW" },
  { name: "Australia", code: "AU" },
  { name: "Austria", code: "AT" },
  { name: "Azerbaijan", code: "AZ" },
  { name: "Bahamas (the)", code: "BS" },
  { name: "Bahrain", code: "BH" },
  { name: "Bangladesh", code: "BD" },
  { name: "Barbados", code: "BB" },
  { name: "Belarus", code: "BY" },
  { name: "Belgium", code: "BE" },
  { name: "Belize", code: "BZ" },
  { name: "Benin", code: "BJ" },
  { name: "Bermuda", code: "BM" },
  { name: "Bhutan", code: "BT" },
  { name: "Bolivia (Plurinational State of)", code: "BO" },
  { name: "Bonaire, Sint Eustatius and Saba", code: "BQ" },
  { name: "Bosnia and Herzegovina", code: "BA" },
  { name: "Botswana", code: "BW" },
  { name: "Bouvet Island", code: "BV" },
  { name: "Brazil", code: "BR" },
  { name: "British Indian Ocean Territory (the)", code: "IO" },
  { name: "Brunei Darussalam", code: "BN" },
  { name: "Bulgaria", code: "BG" },
  { name: "Burkina Faso", code: "BF" },
  { name: "Burundi", code: "BI" },
  { name: "Cabo Verde", code: "CV" },
  { name: "Cambodia", code: "KH" },
  { name: "Cameroon", code: "CM" },
  { name: "Canada", code: "CA" },
  { name: "Cayman Islands (the)", code: "KY" },
  { name: "Central African Republic (the)", code: "CF" },
  { name: "Chad", code: "TD" },
  { name: "Chile", code: "CL" },
  { name: "China", code: "CN" },
  { name: "Christmas Island", code: "CX" },
  { name: "Cocos (Keeling) Islands (the)", code: "CC" },
  { name: "Colombia", code: "CO" },
  { name: "Comoros (the)", code: "KM" },
  { name: "Congo (the Democratic Republic of the)", code: "CD" },
  { name: "Congo (the)", code: "CG" },
  { name: "Cook Islands (the)", code: "CK" },
  { name: "Costa Rica", code: "CR" },
  { name: "Croatia", code: "HR" },
  { name: "Cuba", code: "CU" },
  { name: "Curaçao", code: "CW" },
  { name: "Cyprus", code: "CY" },
  { name: "Czechia", code: "CZ" },
  { name: "Côte d'Ivoire", code: "CI" },
  { name: "Denmark", code: "DK" },
  { name: "Djibouti", code: "DJ" },
  { name: "Dominica", code: "DM" },
  { name: "Dominican Republic (the)", code: "DO" },
  { name: "Ecuador", code: "EC" },
  { name: "Egypt", code: "EG" },
  { name: "El Salvador", code: "SV" },
  { name: "Equatorial Guinea", code: "GQ" },
  { name: "Eritrea", code: "ER" },
  { name: "Estonia", code: "EE" },
  { name: "Eswatini", code: "SZ" },
  { name: "Ethiopia", code: "ET" },
  { name: "Falkland Islands (the) [Malvinas]", code: "FK" },
  { name: "Faroe Islands (the)", code: "FO" },
  { name: "Fiji", code: "FJ" },
  { name: "Finland", code: "FI" },
  { name: "France", code: "FR" },
  { name: "French Guiana", code: "GF" },
  { name: "French Polynesia", code: "PF" },
  { name: "French Southern Territories (the)", code: "TF" },
  { name: "Gabon", code: "GA" },
  { name: "Gambia (the)", code: "GM" },
  { name: "Georgia", code: "GE" },
  { name: "Germany", code: "DE" },
  { name: "Ghana", code: "GH" },
  { name: "Gibraltar", code: "GI" },
  { name: "Greece", code: "GR" },
  { name: "Greenland", code: "GL" },
  { name: "Grenada", code: "GD" },
  { name: "Guadeloupe", code: "GP" },
  { name: "Guam", code: "GU" },
  { name: "Guatemala", code: "GT" },
  { name: "Guernsey", code: "GG" },
  { name: "Guinea", code: "GN" },
  { name: "Guinea-Bissau", code: "GW" },
  { name: "Guyana", code: "GY" },
  { name: "Haiti", code: "HT" },
  { name: "Heard Island and McDonald Islands", code: "HM" },
  { name: "Holy See (the)", code: "VA" },
  { name: "Honduras", code: "HN" },
  { name: "Hong Kong", code: "HK" },
  { name: "Hungary", code: "HU" },
  { name: "Iceland", code: "IS" },
  { name: "India", code: "IN" },
  { name: "Indonesia", code: "ID" },
  { name: "Iran (Islamic Republic of)", code: "IR" },
  { name: "Iraq", code: "IQ" },
  { name: "Ireland", code: "IE" },
  { name: "Isle of Man", code: "IM" },
  { name: "Israel", code: "IL" },
  { name: "Italy", code: "IT" },
  { name: "Jamaica", code: "JM" },
  { name: "Japan", code: "JP" },
  { name: "Jersey", code: "JE" },
  { name: "Jordan", code: "JO" },
  { name: "Kazakhstan", code: "KZ" },
  { name: "Kenya", code: "KE" },
  { name: "Kiribati", code: "KI" },
  { name: "Korea (the Democratic People's Republic of)", code: "KP" },
  { name: "Korea (the Republic of)", code: "KR" },
  { name: "Kuwait", code: "KW" },
  { name: "Kyrgyzstan", code: "KG" },
  { name: "Lao People's Democratic Republic (the)", code: "LA" },
  { name: "Latvia", code: "LV" },
  { name: "Lebanon", code: "LB" },
  { name: "Lesotho", code: "LS" },
  { name: "Liberia", code: "LR" },
  { name: "Libya", code: "LY" },
  { name: "Liechtenstein", code: "LI" },
  { name: "Lithuania", code: "LT" },
  { name: "Luxembourg", code: "LU" },
  { name: "Macao", code: "MO" },
  { name: "Madagascar", code: "MG" },
  { name: "Malawi", code: "MW" },
  { name: "Malaysia", code: "MY" },
  { name: "Maldives", code: "MV" },
  { name: "Mali", code: "ML" },
  { name: "Malta", code: "MT" },
  { name: "Marshall Islands (the)", code: "MH" },
  { name: "Martinique", code: "MQ" },
  { name: "Mauritania", code: "MR" },
  { name: "Mauritius", code: "MU" },
  { name: "Mayotte", code: "YT" },
  { name: "Mexico", code: "MX" },
  { name: "Micronesia (Federated States of)", code: "FM" },
  { name: "Moldova (the Republic of)", code: "MD" },
  { name: "Monaco", code: "MC" },
  { name: "Mongolia", code: "MN" },
  { name: "Montenegro", code: "ME" },
  { name: "Montserrat", code: "MS" },
  { name: "Morocco", code: "MA" },
  { name: "Mozambique", code: "MZ" },
  { name: "Myanmar", code: "MM" },
  { name: "Namibia", code: "NA" },
  { name: "Nauru", code: "NR" },
  { name: "Nepal", code: "NP" },
  { name: "Netherlands (the)", code: "NL" },
  { name: "New Caledonia", code: "NC" },
  { name: "New Zealand", code: "NZ" },
  { name: "Nicaragua", code: "NI" },
  { name: "Niger (the)", code: "NE" },
  { name: "Nigeria", code: "NG" },
  { name: "Niue", code: "NU" },
  { name: "Norfolk Island", code: "NF" },
  { name: "Northern Mariana Islands (the)", code: "MP" },
  { name: "Norway", code: "NO" },
  { name: "Oman", code: "OM" },
  { name: "Pakistan", code: "PK" },
  { name: "Palau", code: "PW" },
  { name: "Palestine, State of", code: "PS" },
  { name: "Panama", code: "PA" },
  { name: "Papua New Guinea", code: "PG" },
  { name: "Paraguay", code: "PY" },
  { name: "Peru", code: "PE" },
  { name: "Philippines (the)", code: "PH" },
  { name: "Pitcairn", code: "PN" },
  { name: "Poland", code: "PL" },
  { name: "Portugal", code: "PT" },
  { name: "Puerto Rico", code: "PR" },
  { name: "Qatar", code: "QA" },
  { name: "Republic of North Macedonia", code: "MK" },
  { name: "Romania", code: "RO" },
  { name: "Russian Federation (the)", code: "RU" },
  { name: "Rwanda", code: "RW" },
  { name: "Réunion", code: "RE" },
  { name: "Saint Barthélemy", code: "BL" },
  { name: "Saint Helena, Ascension and Tristan da Cunha", code: "SH" },
  { name: "Saint Kitts and Nevis", code: "KN" },
  { name: "Saint Lucia", code: "LC" },
  { name: "Saint Martin (French part)", code: "MF" },
  { name: "Saint Pierre and Miquelon", code: "PM" },
  { name: "Saint Vincent and the Grenadines", code: "VC" },
  { name: "Samoa", code: "WS" },
  { name: "San Marino", code: "SM" },
  { name: "Sao Tome and Principe", code: "ST" },
  { name: "Saudi Arabia", code: "SA" },
  { name: "Senegal", code: "SN" },
  { name: "Serbia", code: "RS" },
  { name: "Seychelles", code: "SC" },
  { name: "Sierra Leone", code: "SL" },
  { name: "Singapore", code: "SG" },
  { name: "Sint Maarten (Dutch part)", code: "SX" },
  { name: "Slovakia", code: "SK" },
  { name: "Slovenia", code: "SI" },
  { name: "Solomon Islands", code: "SB" },
  { name: "Somalia", code: "SO" },
  { name: "South Africa", code: "ZA" },
  { name: "South Georgia and the South Sandwich Islands", code: "GS" },
  { name: "South Sudan", code: "SS" },
  { name: "Spain", code: "ES" },
  { name: "Sri Lanka", code: "LK" },
  { name: "Sudan (the)", code: "SD" },
  { name: "Suriname", code: "SR" },
  { name: "Svalbard and Jan Mayen", code: "SJ" },
  { name: "Sweden", code: "SE" },
  { name: "Switzerland", code: "CH" },
  { name: "Syrian Arab Republic", code: "SY" },
  { name: "Taiwan (Province of China)", code: "TW" },
  { name: "Tajikistan", code: "TJ" },
  { name: "Tanzania, United Republic of", code: "TZ" },
  { name: "Thailand", code: "TH" },
  { name: "Timor-Leste", code: "TL" },
  { name: "Togo", code: "TG" },
  { name: "Tokelau", code: "TK" },
  { name: "Tonga", code: "TO" },
  { name: "Trinidad and Tobago", code: "TT" },
  { name: "Tunisia", code: "TN" },
  { name: "Turkey", code: "TR" },
  { name: "Turkmenistan", code: "TM" },
  { name: "Turks and Caicos Islands (the)", code: "TC" },
  { name: "Tuvalu", code: "TV" },
  { name: "Uganda", code: "UG" },
  { name: "Ukraine", code: "UA" },
  { name: "United Arab Emirates (the)", code: "AE" },
  {
    name: "United Kingdom of Great Britain and Northern Ireland (the)",
    code: "GB",
  },
  { name: "United States Minor Outlying Islands (the)", code: "UM" },
  { name: "United States of America (the)", code: "US" },
  { name: "Uruguay", code: "UY" },
  { name: "Uzbekistan", code: "UZ" },
  { name: "Vanuatu", code: "VU" },
  { name: "Venezuela (Bolivarian Republic of)", code: "VE" },
  { name: "Viet Nam", code: "VN" },
  { name: "Virgin Islands (British)", code: "VG" },
  { name: "Virgin Islands (U.S.)", code: "VI" },
  { name: "Wallis and Futuna", code: "WF" },
  { name: "Western Sahara", code: "EH" },
  { name: "Yemen", code: "YE" },
  { name: "Zambia", code: "ZM" },
  { name: "Zimbabwe", code: "ZW" },
];
//


//Register Validation
if(signup){
  signup.addEventListener('submit', function (event) {
    //let errorRegisterFlag = errorRegister.hidden
    errorRegister.hidden = true;
    let usernameC = username.value.trim()
    let passwordC = password.value.trim()
    let confirmPasswordC = confirmPassword.value.trim()
    let countryCodeC = countryCode.value.trim()
    let phoneNumberC;
    let discordC;
    let emailC;
    if(discord.value){
      discordC = discord.value.trim()
    }
    if(email.value){
      emailC = email.value.trim()
    }
    if(phoneNumber.value){
      phoneNumberC = phoneNumber.value.trim()
    }
    errorRegister.innerHTML = "";
    if (!signup.checkValidity()) {
      event.preventDefault()
      event.stopPropagation()
    }
    else {
      //Username
      if (typeof usernameC !== "string") {
        let em1 = document.createElement("dt")
        em1.innerHTML = "Error: Inputed Username is not a String"
        errorRegister.append(em1)
        errorRegister.hidden = false;
      }
      if (typeof passwordC !== "string"){
        let em2 = document.createElement("dt")
        em2.innerHTML = " Error: Inputed Password is not a String"
        errorRegister.append(em2)
        errorRegister.hidden = false;
      }
      if (usernameC.length === 0) {
        let em3 = document.createElement("dt")
        em3.innerHTML = " Username must not be empty";
        errorRegister.append(em3)
        errorRegister.hidden = false;
      }
      if (usernameC.includes(" ")) {
        console.log("FUck this username")
        let em4 = document.createElement("dt")
        em4.innerHTML = " Username must not contain spaces";
        errorRegister.append(em4)
        errorRegister.hidden = false;
      }
      if (usernameC.length < 8) {
        let em5 = document.createElement("dt")
        em5.innerHTML = " Username must be at least 8 characters";
        errorRegister.append(em5)
        errorRegister.hidden = false;
      }
      if (usernameC.length > 20) {
        let em6 = document.createElement("dt")
        em6.innerHTML = " Username must be at most 20 characters";
        errorRegister.append(em6)
        errorRegister.hidden = false;
      }
      if (!/^[a-zA-Z0-9]+$/.test(usernameC)) {
        let em7 = document.createElement("dt")
        em7.innerHTML =  " Username must be alphanumeric";
        errorRegister.append(em7)
        errorRegister.hidden = false;
      }
      //Password
      if (passwordC.length < 8) {
        let em8 = document.createElement("dt")
        em8.innerHTML =  " Password must be at least 8 characters";
        errorRegister.append(em8)
        errorRegister.hidden = false;
      }
      if (passwordC.length > 20) {
        let em9 = document.createElement("dt")
        em9.innerHTML = " Password must be at most 20 characters";
        errorRegister.append(em9)
        errorRegister.hidden = false;
      }
      if (passwordC.includes(" ")) {
        let em10 = document.createElement("dt")
        em10.innerHTML = " Password must not contain spaces";
        errorRegister.append(em10)
        errorRegister.hidden = false;
      }
      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(passwordC)) {
        let em11 = document.createElement("dt")
        em11.innerHTML = " Password must Minimum eight characters, at least one uppercase letter, one lowercase letter and one number";
        errorRegister.append(em11)
        errorRegister.hidden = false;
      }
      if(passwordC != confirmPasswordC){
        let whoops = document.createElement("dt")
        whoops.innerHTML = " Password and Confirm Password must match";
        errorRegister.append(whoops)
        errorRegister.hidden = false;
      }
      //Phone Number
      if(phoneNumberC){
      if (typeof phoneNumberC === "undefined"){
        let em12 = document.createElement("dt")
        em12.innerHTML = "Phone number is undefined";
        errorRegister.append(em12)
        errorRegister.hidden = false;
      }
      if (typeof phoneNumberC !== "string"){
        let em13 = document.createElement("dt")
        em13.innerHTML ="Phone number is not a string";
        errorRegister.append(em13)
        errorRegister.hidden = false;
      } 
      if (phoneNumberC.length < 10){
        let em14 = document.createElement("dt")
        em14.innerHTML ="Phone number is too short";
        errorRegister.append(em14)
        errorRegister.hidden = false;
      } 
      if (phoneNumberC.length > 15){
        let em15 = document.createElement("dt")
        em15.innerHTML ="Phone number is too long";
        errorRegister.append(em15)
        errorRegister.hidden = false;
      } 
      if (!/^\+?[0-9]+$/.test(phoneNumberC)){
        let em16 = document.createElement("dt")
        em16.innerHTML ="Phone number is not valid";
        errorRegister.append(em16)
        errorRegister.hidden = false;
      } 
    }
      //Country Code
      if (typeof countryCodeC === "undefined"){
        let em17 = document.createElement("dt")
        em17.innerHTML ="Country is undefined";
        errorRegister.append(em17)
        errorRegister.hidden = false;
      }
      if (typeof countryCodeC !== "string"){
        let em18 = document.createElement("dt")
        em18.innerHTML ="Country is not a string";
        errorRegister.append(em18)
        errorRegister.hidden = false;
      }
      if (countryCodeC.length != 2){ 
        let em19 = document.createElement("dt")
        em19.innerHTML ="Country code is not 2 characters";
        errorRegister.append(em19)
        errorRegister.hidden = false;
      }
      let countryCodeCC = countryCodeC.toUpperCase();
      let country = countrySet.find((c) => c.code === countryCodeCC);
      if (typeof country === "undefined"){
        let em20 = document.createElement("dt")
        em20.innerHTML ="Country code is not valid";
        errorRegister.append(em20)
        errorRegister.hidden = false;
      }
      //Errors Thrown Check
      if(errorRegister.hidden == false){
        console.log("ERRORRRR")
        event.preventDefault()
        event.stopPropagation()
      }
    }
    signup.classList.add('was-validated')
  }, false)
}

//Login Validation
if(signin){
  signin.addEventListener('submit', function (event) {
    errorLogin.hidden = true;
    let usernameC = username.value.trim()
    let passwordC = password.value.trim()
    emessage = "";
    errorLogin.innerHTML = "";
    if (!signin.checkValidity()) {
      event.preventDefault()
      event.stopPropagation()
    }
    else {
      //Username
      if (typeof usernameC !== "string") {
        let em1 = document.createElement("dt")
        em1.innerHTML = "Error: Inputed Username is not a String"
        errorLogin.append(em1)
        errorLogin.hidden = false;
      }
      if (typeof passwordC !== "string"){
        let em2 = document.createElement("dt")
        em2.innerHTML = " Error: Inputed Password is not a String"
        errorLogin.append(em2)
        errorLogin.hidden = false;
      }
      if (usernameC.length === 0) {
        let em3 = document.createElement("dt")
        em3.innerHTML = " Username must not be empty";
        errorLogin.append(em3)
        errorLogin.hidden = false;
      }
      if (usernameC.includes(" ")) {
        let em4 = document.createElement("dt")
        em4.innerHTML = " Username must not contain spaces";
        errorLogin.append(em4)
        errorLogin.hidden = false;
      }
      if (usernameC.length < 8) {
        let em5 = document.createElement("dt")
        em5.innerHTML = " Username must be at least 8 characters";
        errorLogin.append(em5)
        errorLogin.hidden = false;
      }
      if (usernameC.length > 20) {
        let em6 = document.createElement("dt")
        em6.innerHTML = " Username must be at most 20 characters";
        errorLogin.append(em6)
        errorLogin.hidden = false;
      }
      if (!/^[a-zA-Z0-9]+$/.test(usernameC)) {
        let em7 = document.createElement("dt")
        em7.innerHTML =  " Username must be alphanumeric";
        errorLogin.append(em7)
        errorLogin.hidden = false;
      }
      //Password
      if (passwordC.length < 8) {
        let em8 = document.createElement("dt")
        em8.innerHTML =  " Password must be at least 8 characters";
        errorLogin.append(em8)
        errorLogin.hidden = false;
      }
      if (passwordC.length > 20) {
        let em9 = document.createElement("dt")
        em9.innerHTML = " Password must be at most 20 characters";
        errorLogin.append(em9)
        errorLogin.hidden = false;
      }
      if (passwordC.includes(" ")) {
        let em10 = document.createElement("dt")
        em10.innerHTML = " Password must not contain spaces";
        errorLogin.append(em10)
        errorLogin.hidden = false;
      }
      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(passwordC)) {
        let em11 = document.createElement("dt")
        em11.innerHTML = " Password must Minimum eight characters, at least one uppercase letter, one lowercase letter and one number";
        errorLogin.append(em11)
        errorLogin.hidden = false;
      }
      //Errors Thrown Check
      if(errorLogin.hidden == false){
        event.preventDefault()
        event.stopPropagation()
      }
    }
    signin.classList.add('was-validated')
  }, false)
}
//