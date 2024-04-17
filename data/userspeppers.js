import { users, peppers } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import usersData from "./users.js";
import peppersData from "./peppers.js";
import usersValidation from "../usersValidation.js";
import xss from "xss";

/**
 * 
 * @param {string} userId 
 * @param {string} pepperName 
 * @returns user object
 * @throws {string} invalid fields, xss vulnerability detected, user not found, pepper not found
 */
const addPepperToUserInv = async (userId, pepperName) => {
    if (!userId || !pepperName) throw "fields incomplete";
    if (typeof userId !== "string" || typeof pepperName !== "string") throw "fields not strings";
    try{
        userId = usersValidation.validateUserId(userId);
    } catch (error) {
        throw error;
    }
    if (userId !== xss(userId)) throw "userId is an xss vulnerability";
    if(pepperName !== xss(pepperName)) throw "pepperName is an xss vulnerability";

    let foundUser, foundPepper;
    try {
        foundUser = await usersData.getUserById(userId);
    } catch (error) {
        throw error;
    }
    try {
        foundPepper = await peppersData.getPepperByName(pepperName);
    } catch (error) {
        throw error;
    }
    if (!foundUser) throw "User not found";
    if (!foundPepper) throw "Pepper not found";

    pepperName = pepperName.toLowerCase();
    const userCollection = await users();

    try{
        await userCollection.updateOne({ _id: new ObjectId(userId) }, { $addToSet: { inventory: pepperName } });
    }catch(error){
        throw error;
    }
    try{
        foundUser = await usersData.getUserById(userId);
    } catch (error) {
        throw error;
    }
    
    return foundUser;
}


/**
 * 
 * @param {string} userId 
 * @param {string} pepperName 
 * @returns user object
 * @throws {string} invalid fields, xss vulnerability detected, user not found, pepper not found
 */
const addPepperToUserWL = async (userId, pepperName) => {
    if (!userId || !pepperName) throw "fields incomplete";
    if (typeof userId !== "string" || typeof pepperName !== "string") throw "fields not strings";
    try{
        userId = usersValidation.validateUserId(userId);
    } catch (error) {
        throw error;
    }
    if (userId !== xss(userId)) throw "userId is an xss vulnerability";
    if(pepperName !== xss(pepperName)) throw "pepperName is an xss vulnerability";

    let foundUser, foundPepper;
    try {
        foundUser = await usersData.getUserById(userId);
    } catch (error) {
        throw error;
    }
    try {
        foundPepper = await peppersData.getPepperByName(pepperName);
    } catch (error) {
        throw error;
    }
    // console.log(foundPepper)
    if (!foundUser) throw "User not found";
    if (!foundPepper) throw "Pepper not found";

    pepperName = pepperName.toLowerCase();
    const userCollection = await users();
    try {
        await userCollection.updateOne({ _id: new ObjectId(userId) }, { $addToSet: { wishlist: pepperName } });
    } catch (error) {
        throw error;
    }

    foundUser = await usersData.getUserById(userId);
    return foundUser;
}

export default { addPepperToUserInv, addPepperToUserWL };