import { users } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import bcryptjs from "bcryptjs";
import xss from "xss";
import usersValidation from "../usersValidation.js";

// discord, phone are allowed to be undefined. just be sure to enter them as undefined when calling function
/**
 * city and state cannot be used without countryCode being US.
 * 
 * if city is used, state must be used
 * 
 * @param {boolean} moderator
 * @param {string} username
 * @param {boolean} displayWishlist
 * @param {string | undefined} city
 * @param {string | undefined} state
 * @param {string | undefined} countryCode
 * @param {string | undefined} discord
 * @param {string | undefined} phone
 * @param {string | undefined} email
 * @param {string} password
 * @returns {string} userId
 */

const createUser = async (
  moderator, //required, bool
  username, //required, string
  displayWishlist, //required, bool
  city, //optional, string
  state, //optional, string
  countryCode, //required, string
  discord, //optional, string
  phone, //optional, string
  email, //optional, string
  password //reqiored, string
) => {
  // TODO
  // check if username is in use, regardless of case

  //validating the required fields (moderator, userName, displayWishlist, countryCode, password)
  

  
  try {
    moderator = usersValidation.validateBoolean(moderator, "moderator");
    username = usersValidation.validateUsername(username);
    displayWishlist = usersValidation.validateBoolean(displayWishlist, "displayWishlist");
    countryCode = usersValidation.validateCountryCode(countryCode);
    password = usersValidation.validatePassword(password);
  } catch (error) {
    throw error;
  }
  //xss sanitizing mandatory string fields (userName, countryCode, password)
  username = xss(username);
  countryCode = xss(countryCode);


  if (password !== xss(password)) {
    throw `${password}Password is an xss vulnerability`;
  }
  password = xss(password); //already did validation

  //validating optional fields for if CountryCode= US
  if (countryCode === "US") {
    try {
      if (state) {
        state = xss(state);
        state = usersValidation.validateState(state);
        if (city) {
          city = usersValidation.validateCity(city);
        }
      }
    } catch (error) {
      throw error;
    }
    city = xss(city);
    state = xss(state);
  }

  //validating + sanitizing optional string fields (discord, phone, email)
  if (discord) {
    discord = usersValidation.validateDiscord(discord);
    if (discord !== xss(discord)) {
      throw "Discord username is an xss vulnerability";
    }
    discord = xss(discord);
  }
  if (phone) {
    phone = usersValidation.validatePhoneNumber(phone);
    if (phone !== xss(phone)) {
      throw "Phone number is an xss vulnerability";
    }
    phone = xss(phone);
  }
  if (email) {
    // console.log(email);
    email = usersValidation.validateEmail(email);
    if (email !== xss(email)) {
      throw "Email is an xss vulnerability";
    }
    if (await emailInUse(email)) {
      throw "Email already in use";
    }
    email = xss(email);
  }

  //hashing password
  const hashedPassword = await bcryptjs.hash(password, 10);

  if (countryCode !== "US" && (state || city))
    throw "state or city provided without US as countryCode";
  if (!state && city) throw "city provided without state";

  // checking if username is in use
  if (await userNameExists(username)) {
    throw "Username already in use";
  }

  //creating user object
  let newUser = {
    moderator: moderator,
    username: username,
    displayWishlist: displayWishlist,
		hashedPassword: hashedPassword,
    city: city,
    state: state,
    countryCode: countryCode,
		wishlist: [],
    inventory: [],
    discord: discord,
    phone: phone,
    email: email,
		trades: [],
		avgRating: 0,
		growLog: [],
		profileComments: [],
  };
	const userCollection = await users();
  const insertInfo = await userCollection.insertOne(newUser);
  if (!insertInfo.acknowledged || !insertInfo.insertedId) {
    throw "Could not add user";
  }
  //   returs id of user just made
  return insertInfo.insertedId.toString();
};
/**
 *
 * @param {string} username
 * @returns boolean
 */
const userNameExists = async (username) => {
  const userCollection = await users();
  const findingUser = await userCollection.findOne({
    username: { $regex: username, $options: "i" },
  });
  if (findingUser) {
    return true;
  }
  return false;
};
/**
 *
 * @param {string} email
 * @returns boolean
 */
const emailInUse = async (email) => {
	const userCollection = await users();
  const findingUser = await userCollection.findOne({
    email: { $regex: email, $options: "i" },
  });
  if (findingUser) {
    return true;
  }
  return false;
};
/**
 *
 * @param {string} username
 * @returns {object} user object
 */
const getUserByName = async (username) => {
  const findingUser = await userCollection.findOne({
    username: { $regex: username, $options: "i" },
  });
  if (!findingUser) {
    throw "User not found";
  }
  return findingUser;
};

/**
 *
 * @param {string} userId
 * @returns {object} user object
 * @throws {string} "Invalid userId, User not found"
 */
const getUserById = async (userId) => {
  //userId is a string
  try {
    userId = usersValidation.validateUserId(userId);
  } catch (error) {
    throw error;
  }
  if (userId !== xss(userId)) {
    throw "userId is an xss vulnerability";
  }
  if (!ObjectId.isValid(userId)) {
    throw "Invalid userId";
  }
  const userCollection = await users();
  const findingUser = await userCollection.findOne({
    _id: new ObjectId(userId),
  });
  if (!findingUser) {
    throw "User not found";
  }
  return findingUser;
};
export default { createUser, userNameExists, emailInUse, getUserByName, getUserById };