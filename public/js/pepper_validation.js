//filter form
let filterform = document.getElementById('filter-form')

//items
let varietyName = document.getElementById('varietyName');
let species = document.getElementById('species');
let heatLevel = document.getElementById('heatLevel');
let originCountryCode = document.getElementById('originCountryCode');
let daysToHarvest = document.getElementById('daysToHarvest');
let minsize = document.getElementById('minsize');
let maxsize = document.getElementById('minsize');
let isHeatOn = document.getElementById('filterByHeat');

//error display area
let errorbox = document.getElementById('errorbox');

//some dandy tools

const capsicumSpecies = [
    "annuum",
    "baccatum",
    "chinense",
    "frutescens",
    "pubescens",
  ];

const addError = (errstring, e=null) => {
    let em = document.createElement("dt");
    em.innerHTML = errstring;
    errorbox.append(em)
    errorbox.hidden = false;
    if(e){
        e.preventDefault();
        e.stopPropagation();
    }
}

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

if(filterform){
    filterform.addEventListener('submit', function (event) {
        let unprovided = 0;
        errorbox.innerHTML = ""
        errorbox.hidden = true;
        const fields = [species, heatLevel, originCountryCode, daysToHarvest, varietyName];
        for(let field of fields){
            if(!field.value.trim() && (field.getAttribute('name') !== 'heatLevel')){
                unprovided++;
                continue;
                //user entered a falsey value, so just skip it unless its heat level (because 0 is valid there)
            } else if(field.getAttribute('name') === 'heatLevel' && !isHeatOn.checked){
                unprovided++;
                continue;
                //user is not filtering by heat level, just skip it
            } else if(field.getAttribute('name') === 'species' && field.value === 'all'){
                unprovided++;
                continue;
                //user isnt filtering by species, just skip it
            } else if(field.getAttribute('name') === 'heatLevel'){
                let num = parseInt(field.value);
                if(num < 0 || num > 6 || isNaN(num)){
                    addError("Heat Level Invalid", event)
                }
                //user is filtering by heat - so validate
            } else if(field.getAttribute('name') === 'species'){
                if(!capsicumSpecies.includes(field.value)){
                    addError("Species Invalid", event)
                }
            } else if(field.getAttribute('name') === 'originCountryCode'){
                let code = field.value
                code = code.trim().toUpperCase();
                if(code.length !== 2 || (countrySet.find((c) => c.code === countryCode)) === undefined){
                    addError("Invalid Country Code", event)
                }
            } else if(field.getAttribute('name') === 'varietyName'){
                if(field.value.trim().length <= 0){
                    addError("Invalid Name", event)
                }
            } else if(field.getAttribute('name') === 'daysToHarvest'){
                if(isNaN(parseInt(field.value))){
                    addError("Invalid Harvest Time", event);
                }
            }
        }
        //validate size separately since its an array
        if(minsize.value.trim() && maxsize.value.trim()){
            //only validate if user provided both of them
            sizeArr = [parseFloat(minsize.value.trim()), parseFloat(maxsize.value.trim())];
            if(isNaN(sizeArr[0]) || isNaN(sizeArr[1])){
                addError("Invalid Size Range", event);
            }
        } else unprovided++;
        //if all of the fields are unprovided, add an error saying that there are no valid criteria
        if(unprovided === 6){
            addError("No valid criteria given", event)
        }
    })
};