import { peppers } from "../config/mongoCollections.js";
import { users } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import usersValidation from "../usersValidation.js";
import pepperValidation from "../pepperValidation.js";
import xss from "xss";

/**
 * searches among unnaproved peppers. if you try approving an approved pepper, it will throw
 * @param {string} userId
 * @param {string} pepperName
 * @param {boolean} approveBool
 * @returns {object} pepper object || string "deleted entry"
 * @throws {string} "User not found", "User not a moderator", "Pepper not found", "Pepper already approved", or errors in validation
 */
const approvePepper = async (userId, pepperName, approveBool) => {
  const usersCollection = await users();
  const peppersCollection = await peppers();
  if (!userId || !pepperName || approveBool == undefined)
    throw "fields incomplete";
  if (approveBool === undefined || typeof approveBool !== "boolean")
    throw "approveBool not boolean";
  userId = xss(userId);
  pepperName = xss(pepperName);
  approveBool = xss(approveBool);
  try {
    userId = usersValidation.validateUserId(userId);
    pepperName = pepperValidation.validatePepperName(pepperName);
  } catch (error) {
    throw error;
  }

  let user;

  try {
    user = await usersCollection.findOne({ _id: new ObjectId(userId) });
  } catch (error) {
    throw error;
  }
  if (!user) throw "User not found";
  if (!user.moderator) throw "User not a moderator";
  const pepper = await peppersCollection.findOne({
    name: pepperName,
    moderatorApproved: false,
  });
  if (!pepper) throw "Pepper not found among unapproved peppers";

  if (approveBool) {
    await peppersCollection.updateOne(
      { name: pepperName },
      { $set: { moderatorApproved: true } }
    );
    return await peppersCollection.findOne({ name: pepperName });
  }
  if (!approveBool) {
    await peppersCollection.deleteOne({ name: pepperName });
    return "deleted entry";
  }
};


/**
 * @param {string} userId
 * @param {string} pepperId
 * @param {boolean} approveBool
 * @returns {object} pepper object || string "deleted entry"
 * @throws {string} "User not found", "User not a moderator", "Pepper not found", "Pepper already approved", or errors in validation
 */
const approvePepperById = async (userId, pepperId, approveBool) => {
  const usersCollection = await users();
  const peppersCollection = await peppers();
  if (!userId || !pepperId || approveBool == undefined)
    throw "fields incomplete";
  if (approveBool === undefined || typeof approveBool !== "boolean")
    throw "approveBool not boolean";
  userId = xss(userId);
  pepperId = xss(pepperId);
  approveBool = xss(approveBool);
  try {
    userId = usersValidation.validateUserId(userId);
    pepperId = pepperValidation.validatePepperId(pepperId);
  } catch (error) {
    throw error;
  }

  let user;

  try {
    user = await usersCollection.findOne({ _id: new ObjectId(userId) });
  } catch (error) {
    throw error;
  }
  if (!user) throw "User not found";
  if (!user.moderator) throw "User not a moderator";
  const pepper = await peppersCollection.findOne({
    _id: new ObjectId(pepperId),
    moderatorApproved: false,
  });
  if (!pepper) throw "Pepper not found among unapproved peppers";

  if (approveBool) {
    await peppersCollection.updateOne(
      { _id: new ObjectId(pepperId) },
      { $set: { moderatorApproved: true } }
    );
    return await peppersCollection.findOne({ _id: new ObjectId(pepperId) });
  }
  if (!approveBool) {
    await peppersCollection.deleteOne({ _id: new ObjectId(pepperId) });
    return "deleted entry";
  }
}

export default { approvePepper, approvePepperById };
