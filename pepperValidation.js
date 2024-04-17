import { ObjectId } from "mongodb";

/**
 * 
 * @param {string} pepperName 
 * @returns string pepperName
 * @throws {string}
 */
const validatePepperName = (pepperName) => {
  if (typeof pepperName === "undefined") throw "Pepper name is undefined";
  if (typeof pepperName !== "string") throw "Pepper name is not a string";
  if (pepperName.trim().length === 0) throw "Pepper name is an empty string";
  return pepperName.trim().toLowerCase(); //we save things lowercased in db;
};

/**
 * 
 * @param {string[]} alternativeNames 
 * @returns {string[]} alternativeNames
 * @throws {string}
 */
const validateAlternativeNames = (alternativeNames) => {
  if (typeof alternativeNames === "undefined")
    throw "Alternative names are undefined";
  if (!Array.isArray(alternativeNames))
    throw "Alternative names are not an array";
  // if (alternativeNames.length === 0) throw "Alternative names array is empty";
  try {
    alternativeNames.forEach((name) => {
      validatePepperName(name);
    });
  } catch (e) {
    throw "Alternative names array contains invalid pepper name(s)";
  }
  return alternativeNames;
};

/**
 * 
 * @param {string} species 
 * @returns {string} species
 * @throws {string}
 */
const validateSpecies = (species) => {
  const capsicumSpecies = [
    "annuum",
    "baccatum",
    "chinense",
    "frutescens",
    "pubescens",
  ];
  if (typeof species === "undefined") throw "Species is undefined";
  if (typeof species !== "string") throw "Species is not a string";
  if (species.trim().length === 0) throw "Species is an empty string";
  species = species.trim().toLowerCase();
  if (!capsicumSpecies.includes(species))
    throw "Species is not a valid capsicum species";
  return species; //we save things lowercased in db;
};

/**
 * 
 * @param {number} heatLevel 
 * @returns {number} heatLevel
 * @throws {string}
 */
const validateHeatLevel = (heatLevel) => {
  if (typeof heatLevel === "undefined") throw "Heat level is undefined";
  if (typeof heatLevel !== "number") throw "Heat level is not a number";
  if (heatLevel < 0 || heatLevel > 6) throw "Heat level is not in range 0-6";
  return heatLevel;
};

//peppers can have a color of black, brown, cream, golden, green, orange, pink, purple, red, white, yellow
/**
 * 
 * @param {string} color 
 * @returns {string} color
 * @throws {string}
 */
const validateColor = (color) => {
  const capsicumColors = [
    "black",
    "brown",
    "cream",
    "golden",
    "green",
    "orange",
    "pink",
    "purple",
    "red",
    "white",
    "yellow",
  ];
  if (typeof color === "undefined") throw "Color is undefined";
  if (typeof color !== "string") throw "Color is not a string";
  if (color.trim().length === 0) throw "Color is an empty string";
  color = color.trim().toLowerCase();
  if (!capsicumColors.includes(color)) {
    throw "Color is not a valid pepper color";
  }
  return color;
};

/**
 * 
 * @param {number[2]} sizeCM 
 * @returns {number[2]} sizeCM
 * @throws {string}
 */
const validateSizeCM = (sizeCM) => {
  if (!Array.isArray(sizeCM)) {
    throw new Error("sizeCM must be an array");
  }
  if (sizeCM.length !== 2) {
    throw new Error("sizeCM must have exactly two elements");
  }
  if (typeof sizeCM[0] !== "number" || typeof sizeCM[1] !== "number") {
    throw new Error("sizeCM elements must be numbers");
  }
  if (sizeCM[0] < 0 || sizeCM[1] < 0) {
    throw new Error("sizeCM elements must be positive");
  }
  if (sizeCM[0] > sizeCM[1]) {
    throw new Error("sizeCM elements must be in increasing order");
  }
  if (sizeCM[0] > 50 || sizeCM[1] > 100) {
    throw new Error("sizeCM elements must be less than or equal to 50");
  }
  return sizeCM;
};

//In practice we will have days to harvest max out at 120
/**
 * 
 * @param {number} daysToHarvest 
 * @returns {number} daysToHarvest
 * @throws {string}
 */
const validateDaysToHarvest = (daysToHarvest) => {
  if (typeof daysToHarvest === "undefined")
    throw "Days to harvest is undefined";
  if (typeof daysToHarvest !== "number")
    throw "Days to harvest is not a number";
  if (daysToHarvest < 0) throw "Days to harvest is negative";
  if (daysToHarvest > 120) throw "Days to harvest is greater than 120";
  return daysToHarvest;
};

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

/**
 * 
 * @param {string} countryCode 
 * @returns {string} countryCode
 * @throws {string}
 */
const validateCountryCode = (countryCode) => {
  if (typeof countryCode === "undefined") throw "Country is undefined";
  if (typeof countryCode !== "string") throw "Country is not a string";
  if (countryCode.trim().length != 2) throw "Country code is not 2 characters";
  countryCode = countryCode.trim().toUpperCase();
  if (countryCode === "__") return countryCode;
  let country = countrySet.find((c) => c.code === countryCode);
  if (typeof country === "undefined") throw "Country code is not valid";
  return countryCode;
};

/**
 * 
 * @param {string} pepperId 
 * @returns {string} pepperId
 * @throws {string}
 */
const validatePepperId = (pepperId) => {
  if (!pepperId) throw "Pepper ID is not provided";
  if (typeof pepperId === "undefined") throw "Pepper ID is not provided";
  if (typeof pepperId !== "string") throw "Pepper ID is not a string";
  if (pepperId.trim().length === 0) throw "Pepper ID is an empty string";
  pepperId = pepperId.trim();
  if (!ObjectId.isValid(pepperId)) throw "invalid object ID";
  return pepperId.trim();
};
export default {validatePepperName, validateAlternativeNames, validateSpecies, validateHeatLevel, validateColor, validateSizeCM, validateDaysToHarvest, validateCountryCode, validatePepperId}