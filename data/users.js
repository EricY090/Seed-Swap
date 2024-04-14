import { users } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import {
  validateBoolean,
  validateUserName,
  validatePassword,
  validateEmail,
  validateCountryCode,
} from "../userValidation.js";

// discord, phone are allowed to be undefined. just be sure to enter them as undefined when calling function
export const createUser = async (
  moderator,
  userName,
  displayWishlist,
  city,
  state,
  countryCode,
  wishlist, //TODO
  inventory, //TODO
  discord, //TODO
  phone, //TODO
  email,
  password
) => {
  try {
    moderator = validateBoolean(moderator);
    displayWishlist = validateBoolean(displayWishlist);
    userName = validateUserName(userName);
    validatePassword(password);
    validateEmail(email);
  } catch (error) {
    throw error;
  }
  countryCode = validateCountryCode(countryCode);

  if (countryCode.toUpperCase() === "US") {
    //only doing validateCity and validateState if the country is US
    try {
      validateState(state);
      validateCity(city);
    } catch (error) {
      throw error;
    }
  }
};
