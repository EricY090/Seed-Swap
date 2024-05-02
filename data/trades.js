import { users, trades, peppers } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import usersData from "./users.js";
import peppersData from "./peppers.js";
import xss from "xss";
import pepperValidation from "../pepperValidation.js";
import usersValidation from "../usersValidation.js";

/**
 * HAVE TO CHECK IF INVENTORIES HAVE THE PEPPER
 * @param {string} InitiatorID
 * @param {[string]} peppers Initiator is sending
 * @param {string} receiverID
 * @param {[string]} peppers Receiver is sending
 * @returns {object} trade object
 * @throws {string} field type errors, invalid uids, peppernames, peppers not found, peppers not in respective inventory
 */
const initiateTrade = async (userAID, userAPeppers, userBID, userBPeppers) => {
  // check if fields are complete, uids are strings, peppers are arrays
  if (!userAID || !userAPeppers || !userBID || !userBPeppers)
    throw "fields incomplete";
  if (typeof userAID !== "string" || typeof userBID !== "string")
    throw "User ID fields not strings";

  if (!Array.isArray(userAPeppers) || !Array.isArray(userBPeppers))
    throw "Pepper fields not arrays";
  try {
    userAID = usersValidation.validateUserId(userAID);
    userBID = usersValidation.validateUserId(userBID);
  } catch (error) {
    throw error;
  }
  if (userAID !== xss(userAID)) throw "userAID is an xss vulnerability";
  if (userBID !== xss(userBID)) throw "userBID is an xss vulnerability";

  for (let pepperName of userAPeppers) {
    pepperValidation.validatePepperName(pepperName);
    let pepper = await peppersData.getPepperByNameAppr(pepperName);
    if (pepper === null) {
      throw `Pepper ${pepperName} not found or not approved for trade`;
    }
  }
  for (let pepperName of userBPeppers) {
    let pepper = await peppersData.getPepperByNameAppr(pepperName);
    if (pepper === null) {
      throw `Pepper ${pepperName} not found or not approved for trade`;
    }
  }
  try {
    userAPeppers = userAPeppers.map((pepperName) =>
      pepperValidation.validatePepperName(pepperName)
    );
    userBPeppers = userBPeppers.map((pepperName) =>
      pepperValidation.validatePepperName(pepperName)
    );
  } catch (error) {
    throw "found invalid pepper name";
  }
  // check if both users have their peppers in their inventory
  let initiatorUser;
  let receiverUser;

  try {
    initiatorUser = await usersData.getUserById(userAID);
    receiverUser = await usersData.getUserById(userBID);
  } catch (error) {
    throw error;
  }
  let initiatorObjInventory = initiatorUser.inventory;
  let receiverObjInventory = receiverUser.inventory;

  for (let pepperName of userAPeppers) {
    if (!initiatorObjInventory.includes(pepperName)){
      throw "Initiator is trying to send peppers not in their inventory: " + pepperName;
    }
  }
  for(let pepperName of userBPeppers){
    if (!receiverObjInventory.includes(pepperName)){
      throw "Receiver is asked to send peppers not in their inventory: " + pepperName;
    }
  }
  let newTrade = {
    initiator: userAID,
    receiver: userBID,
    initiatorSending: userAPeppers,
    receiverSending: userBPeppers,
    receiverAccepted: false,
  };
  let tradeCollection = await trades();
  const insertInfo = await tradeCollection.insertOne(newTrade);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw "Trade not initiated";
  const insertedTrade = await tradeCollection.findOne({
    _id: insertInfo.insertedId,
  });
  return insertedTrade;
};


/**
 * 
 * @param {string} tradeID 
 * @returns {object} trade object
 * @throws fields incomplete, type mismatch, xss vulnerability, invalid tradeID
 */
const receiverAccepts = async (tradeID) => {
  if (!tradeID) throw "fields incomplete";
  if (typeof tradeID !== "string")
    throw "fields not strings";
  if (!ObjectId.isValid(tradeID)) throw "Invalid tradeID";
  if (tradeID !== xss(tradeID)) throw "tradeID is an xss vulnerability";


  const tradeCollection = await trades();
  const trade = await tradeCollection.findOne({
    _id: new ObjectId(tradeID),
  });
  if (trade === null) throw "Trade not found";

  await tradeCollection.updateOne(
    { _id: new ObjectId(tradeID) },
    { $set: { receiverAccepted: true } }
  );
  return await tradeCollection.findOne({ _id: new ObjectId(tradeID) });
};


/**
 * 
 * @param {string} tradeID 
 * @returns {string} Trade declined
 * @throws fields incomplete, type mismatch, xss vulnerability, invalid tradeID, trade not found
 */
const receiverDeclines = async (tradeID) => {
  if (!tradeID) throw "fields incomplete";
  if (typeof tradeID !== "string")
    throw "fields not strings";
  if (!ObjectId.isValid(tradeID)) throw "Invalid tradeID";
  if (tradeID !== xss(tradeID)) throw "tradeID is an xss vulnerability";

  const tradeCollection = await trades();
  const trade = await tradeCollection.findOne({
    _id: new ObjectId(tradeID),
  });
  if (trade === null) throw "Trade not found";

  await tradeCollection.deleteOne({ _id: new ObjectId(tradeID) });
  return "Trade declined";
};

/**
 *
 * @param {string} userAID
 * @param {string} userBID
 * @returns {boolean} true if users have at least one trade in DB. false if not
 * @throws {string} fields incomplete, type mismatch, xss vulnerability
 */
const usersHaveTraded = async (userAID, userBID) => {
  if (!userAID || !userBID) throw "fields incomplete";
  if (typeof userAID !== "string" || typeof userBID !== "string")
    throw "fields not strings";
  try {
    userAID = usersValidation.validateUserId(userAID);
    userBID = usersValidation.validateUserId(userBID);
  } catch (error) {
    throw error;
  }
  if (userAID !== xss(userAID)) throw "userAID is an xss vulnerability";
  if (userBID !== xss(userBID)) throw "userBID is an xss vulnerability";
  // userAID = new ObjectId(userAID);
  // userBID = new ObjectId(userBID);
  const tradeCollection = await trades();
  const trade = await tradeCollection.findOne({
    $or: [
      { initiator: userAID, receiver: userBID },
      { initiator: userBID, receiver: userAID },
    ],
    receiverAccepted: true
  });
  if (trade === null) {
    return false;
  }
  return true;
};

/**
 * 
 * @param {string} tradeID 
 * @returns {object} trade object
 * @throws fields incomplete, type mismatch, xss vulnerability, invalid tradeID, trade not found
 */
const getTradeById = async (tradeID) => {
  if (!tradeID) throw "field incomplete";
  if (typeof tradeID !== "string") throw "field not string";
  if(tradeID.trim().length === 0) throw "field empty";
  tradeID = tradeID.trim();
  if (tradeID !== xss(tradeID)) throw "tradeID is an xss vulnerability";
  if (!ObjectId.isValid(tradeID)) throw "invalid tradeId";
  const tradeCollection = await trades();
  const trade = await tradeCollection.findOne({
    _id: new ObjectId(tradeID),
  });
  if (trade === null) throw "Trade not found";
  return trade;
}

//trades where uid is initiator and receiver has not accepted ()
/**
 * 
 * @param {string} userID 
 * @returns {[object]} array of trade objects
 * @throws fields incomplete, type mismatch, xss vulnerability, invalid userID
 */
const getTradesPendingOthersApproval = async (userID) => {
  if (!userID) throw "field incomplete";
  if (typeof userID !== "string") throw "field not string";
  if(userID.trim().length === 0) throw "field empty";
  if(userID !== xss(userID)) throw "userID is an xss vulnerability";
  try {
    userID = usersValidation.validateUserId(userID);
  } catch (error) {
    throw error;
  }
  const tradeCollection = await trades();
  const tradeArr = await tradeCollection.find({
    initiator: userID,
    receiverAccepted: false
  }).toArray();
  return tradeArr;
}

//trades where uid is receiver and receiver has not accepted
//check uid
//find all trades where receiver id is you, and receiverAccepted is false
/**
 * 
 * @param {string} userID 
 * @returns {[object]} array of trade objects
 * @throws fields incomplete, type mismatch, xss vulnerability, invalid userID
 */
const getTradesPendingYourApproval = async (userID) => {
  if (!userID) throw "field incomplete";
  if (typeof userID !== "string") throw "field not string";
  if(userID.trim().length === 0) throw "field empty";
  if(userID !== xss(userID)) throw "userID is an xss vulnerability";
  try {
    userID = usersValidation.validateUserId(userID);
  } catch (error) {
    throw error;
  }
  const tradeCollection = await trades();
  const tradeArr = await tradeCollection.find({
    receiver: userID,
    receiverAccepted: false
  }).toArray();
  return tradeArr;
}

/**
 * 
 * @param {string} userID 
 * @returns {[object]} array of trade objects
 * @throws fields incomplete, type mismatch, xss vulnerability, invalid userID
 */
export const getYourApprovedTrades = async (userID) => {
  if (!userID) throw "field incomplete";
  if (typeof userID !== "string") throw "field not string";
  if(userID.trim().length === 0) throw "field empty";
  if(userID !== xss(userID)) throw "userID is an xss vulnerability";
  try {
    userID = usersValidation.validateUserId(userID);
  } catch (error) {
    throw error;
  }
  const tradeCollection = await trades();
  const tradeArr = await tradeCollection.find({
    $or: [
      { initiator: userID, receiverAccepted: true },
      { receiver: userID, receiverAccepted: true }
    ]
  }).toArray();
  return tradeArr;
}

export default {initiateTrade, receiverAccepts, receiverDeclines, usersHaveTraded, getTradeById, getTradesPendingOthersApproval, getTradesPendingYourApproval, getYourApprovedTrades};
