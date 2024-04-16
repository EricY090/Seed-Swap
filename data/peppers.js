import { peppers } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import pepperValidation from "../pepperValidation.js";

/* 
    heat levels are from 0 to 6.
    // 0 being heatless (bell)
    // 1 being mild - pepperoncini, shishito
    // 2 fresno, hungarian wax, common jalapeno
    // 3 serrano, peter, sugar rush peach
    // 4 common habanero types, scotch bonnet, thai
    // 5 hotter habanero-scotch bonnet types (red savina habanero, choclate scotch bonnets)
    // 6 carolina reaper, 7 pots, ghost peppers. insanely hot stuff that you wouldnt eat with an ulcer
    // peppers can have a color of black, brown, cream, golden, green, orange, pink, purple, red, white, yellow
*/

// only valid species are annuum, chinense, baccatum, frutescens, pubescens
// country is encoded as the 2 letter country code by ISO 3166 standardm, or as '__" for unknown
//sizeCM is encoded as a two-element array. [0] being lower bound, [1] being upper bound
//creates moderatorApproved flag set to FALSE.
const createPepper = async (
  varietyName,
  alternativeNames,
  species,
  heatLevel,
  color,
  sizeCM,
  daysToHarvest,
  originCountryCode
) => {
  //validation comes here later
  try {
    varietyName = pepperValidation.validatePepperName(varietyName);
    alternativeNames = pepperValidation.validateAlternativeNames(alternativeNames);
    species = pepperValidation.validateSpecies(species);
    heatLevel = pepperValidation.validateHeatLevel(heatLevel);
    color = pepperValidation.validateColor(color);
    sizeCM = pepperValidation.validateSizeCM(sizeCM);
    daysToHarvest = pepperValidation.validateDaysToHarvest(daysToHarvest);
    originCountryCode = pepperValidation.validateCountryCode(originCountryCode);
  } catch (error) {
    throw error;
  }

  let newPep = {
    moderatorApproved: false,
    varietyName: varietyName,
    alternativeNames: alternativeNames,
    species: species,
    heatLevel: heatLevel,
    color: color,
    sizeCM: sizeCM,
    daysToHarvest: daysToHarvest,
    originCountryCode: originCountryCode,
  };
  const pepperCollection = await peppers();
  const insertInfo = await pepperCollection.insertOne(newPep);
  if (!insertInfo.acknowledged || !insertInfo.insertedId) {
    throw "Could not add pepper";
  }
  const newId = insertInfo.insertedId.toString();
  const pepper = await getPepperById(newId);
  return pepper;
};

// exactly the same as createPepper, but with moderatorApproved set to TRUE
const createPepperDev = async (
  varietyName,
  alternativeNames,
  species,
  heatLevel,
  color,
  sizeCM,
  daysToHarvest,
  originCountryCode
) => {
  try {
    varietyName = pepperValidation.validatePepperName(varietyName);
    alternativeNames = pepperValidation.validateAlternativeNames(alternativeNames);
    species = pepperValidation.validateSpecies(species);
    heatLevel = pepperValidation.validateHeatLevel(heatLevel);
    color = pepperValidation.validateColor(color);
    sizeCM = pepperValidation.validateSizeCM(sizeCM);
    daysToHarvest = pepperValidation.validateDaysToHarvest(daysToHarvest);
    originCountryCode = pepperValidation.validateCountryCode(originCountryCode);
  } catch (error) {
    throw error;
  }

  let newPep = {
    moderatorApproved: true,
    varietyName: varietyName,
    alternativeNames: alternativeNames,
    species: species,
    heatLevel: heatLevel,
    color: color,
    sizeCM: sizeCM,
    daysToHarvest: daysToHarvest,
    originCountryCode: originCountryCode,
  };
  const pepperCollection = await peppers();
  const insertInfo = await pepperCollection.insertOne(newPep);
  if (!insertInfo.acknowledged || !insertInfo.insertedId) {
    throw "Could not add pepper";
  }
  const newId = insertInfo.insertedId.toString();
  const pepper = await getPepperById(newId);
  return pepper;
};

const getPepperById = async (pepperId) => {
  try {
    pepperId = pepperValidation.validatePepperId(pepperId);
  } catch (error) {
    throw error;
  }
  const pepperCollection = await peppers();
  const pepper = await pepperCollection.findOne({
    _id: new ObjectId(pepperId),
  });
  if (pepper === null) {
    throw "No pepper found with that ID";
  }
  pepper._id = pepper._id.toString();
  return pepper;
};

/**
 * 
 * @param {string} pepperName 
 * @returns pepper object || null
 */
const getPepperByName = async (pepperName) => {
  try {
    pepperName = pepperValidation.validatePepperName(pepperName);
  } catch (error) {
    throw error;
  }
  const pepperCollection = await peppers();
  const pepper = await pepperCollection.findOne({
    varietyName: { $regex: pepperName, $options: "i" },
  });
  if (pepper === null) {
    return null;
  }
  pepper._id = pepper._id.toString();
  return pepper;
}

export default { createPepper, createPepperDev, getPepperById, getPepperByName };