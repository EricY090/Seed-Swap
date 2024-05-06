import { ObjectId } from "mongodb";
import xss from "xss";
// sourced from https://www.codeinwp.com/snippets/list-of-all-countries-html-select-javascript-and-json-format/
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

const validateBoolean = (bool, varName) => {
  if (typeof bool === "undefined") {
    throw `${varName} must be defined`;
  }
  if (typeof bool !== "boolean") {
    throw `${varName} must be a boolean`;
  }
  return bool;
};

/**
 * 
 * @param {string} username
 * @returns username
 * @throws {string} a myriad of error messages
 */
const validateUsername = (username) => {
  // This does NOT check if the username is in use, only if it is valid
  if (typeof username !== "string") {
    throw "Username must be a string";
  }
  username = xss(username);
  let usernameCopy = username;
  if (username.trim() !== usernameCopy) {
    throw "username started/ended with whitespace";
  }
  if (username.length === 0) {
    throw "Username must not be empty";
  }
  if (username.includes(" ")) {
    throw "Username must not contain spaces";
  }
  if (username.length < 8) {
    throw "Username must be at least 8 characters";
  }
  if (username.length > 20) {
    throw "Username must be at most 20 characters";
  }
  if (!/^[a-zA-Z0-9]+$/.test(username)) {
    throw "Username must be alphanumeric";
  }
  return username;
};

const validatePhoneNumber = (phoneNumber) => {
  if (typeof phoneNumber === "undefined") throw "Phone number is undefined";
  if (typeof phoneNumber !== "string") throw "Phone number is not a string";
  phoneNumber = xss(phoneNumber);
  if (phoneNumber.trim().length < 10) throw "Phone number is too short";
  if (phoneNumber.trim().length > 15) throw "Phone number is too long";
  if (!/^\+?[0-9]+$/.test(phoneNumber)) throw "Phone number is not valid";
  return phoneNumber;
};

const validateCity = (city) => {
  if (typeof city === "undefined") throw "City is undefined";
  if (typeof city !== "string") throw "City is not a string";
  city = xss(city);
  if (city.trim().length === 0) throw "City is empty";
  if (city.length > 50) throw "City name is too long";
  return city;
};
const USStates = {
  AL: "Alabama",
  AK: "Alaska",
  AS: "American Samoa",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DE: "Delaware",
  DC: "District Of Columbia",
  FM: "Federated States Of Micronesia",
  FL: "Florida",
  GA: "Georgia",
  GU: "Guam",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MH: "Marshall Islands",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  MP: "Northern Mariana Islands",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PW: "Palau",
  PA: "Pennsylvania",
  PR: "Puerto Rico",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VI: "Virgin Islands",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming",
};

const validateState = (state) => {
  if (typeof state === "undefined") throw "State is undefined";
  if (typeof state !== "string") throw "State is not a string";
  if (state.trim().length === 0) throw "State is empty";
  state = xss(state)
  state = state.trim().toUpperCase();
  if (typeof USStates[state] === "undefined")
    throw `US State abbrev  ${state} does not exist`;
  return state;
};
const validateCountryCode = (countryCode) => {
  //DOESNT allow unknown country
  if (typeof countryCode === "undefined") throw "Country is undefined";
  if (typeof countryCode !== "string") throw "Country is not a string";
  if (countryCode.trim().length != 2) throw "Country code is not 2 characters";
  countryCode = xss(countryCode);
  countryCode = countryCode.trim().toUpperCase();
  let country = countrySet.find((c) => c.code === countryCode);
  if (typeof country === "undefined") throw "Country code is not valid";
  return countryCode;
};

const validateEmail = (email) => {
  //   email = email.toLowerCase();
  if (typeof email !== "string") {
    throw "Email must be a string";
  }
  email = email.trim();
  if (email.length === 0) {
    throw "Email must not be empty";
  }
  email = xss(email);
  if (email.includes(" ")) {
    throw "Email must not contain spaces";
  }
  let atCount = email.split("@").length - 1;
  if (atCount !== 1) {
    throw "Email must contain exactly one @";
  }
  let atSplitArr = email.split("@");
  let emailUsername = atSplitArr[0];
  let emailDomain = atSplitArr[1];
  if (emailUsername.length === 0) {
    throw "Email name must not be empty";
  }
  if (emailDomain.length === 0) {
    throw "Email domain must not be empty";
  }
  if (!emailDomain.includes(".")) {
    throw "Email domain must contain a period";
  }
  return email;
};

const validateDiscord = (discord) => {
  if (typeof discord === "undefined") {
    return undefined;
  }
  if (typeof discord !== "string") {
    throw "Discord username must be a string";
  }
  discord = discord.trim();
  discord = xss(discord);
  if (discord.trim().length === 0) {
    throw "Discord username must not be empty";
  }
  if (discord.includes(" ")) {
    throw "Discord username must not contain spaces";
  }
  if (discord.length < 2) {
    throw "Discord username must be >=2 characters";
  }
  if (discord.length > 32) {
    throw "Discord username must be <=32 characters";
  }
  return discord;
};
const validatePassword = (password) => {
  if (typeof password !== "string") {
    throw "Password must be a string";
  }
  if (password.length < 8) {
    throw "Password must be at least 8 characters";
  }
  if (password.length > 20) {
    throw "Password must be at most 20 characters";
  }
  if (password.includes(" ")) {
    throw "password must not contain spaces";
  }
  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)) {
    //console.log(password);
    //console.log(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password))
    throw "Password must Minimum eight characters, at least one uppercase letter, one lowercase letter and one number";
  }
  return password;
};

const validateUserId = (userId) => {
  if (typeof userId === "undefined") {
    throw "userId is undefined";
  }
  if (typeof userId !== "string") {
    throw "userId is not a string";
  }
  if (!ObjectId.isValid(userId)) {
    throw "userId is not a valid ObjectId";
  }
  return userId;
};

export default {
  validateBoolean,
  validateUsername,
  validatePhoneNumber,
  validateCity,
  validateState,
  validateCountryCode,
  validateEmail,
  validateDiscord,
  validatePassword,
  validateUserId,
};
