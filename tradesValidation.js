import pepperValidation from "./pepperValidation.js";


/**
 * @param {string|| string[]} pepperArr
 * @returns {string[]} pepperArr
 * 
 */
const validatePepperStrOrArr = (pepperArr) => {
  if(typeof pepperArr === "string"){
    try{
      return [pepperValidation.validatePepperName(pepperArr)]
    } catch (error) {
        throw error;
    }
  }
  else if(Array.isArray(pepperArr)){
    try{
      return pepperArr.map((pepperName) => pepperValidation.validatePepperName(pepperName));
    } catch (error) {
        throw error;
    }
  } else {
    throw "Pepper field neither string nor array";
  }
}

export default {validatePepperStrOrArr};