import { Router } from "express";
import { peppersData, usersData } from "../data/index.js";
import pepperValidation from "../pepperValidation.js";
import xss from "xss";


const router = Router();

router
.route("/")
.get(async (req, res) => {
    if(!req.session.user){
        return res.status(401).redirect("/login");
    }
    return res.render("submission/submission");
})
.post(async (req, res) => {
    if(!req.session.user){
        return res.status(401).redirect("/login");
    }
    let varietyName, species, heatLevel, color, sizeCMLower, sizeCMUpper, daysToHarvest, origin, altNames 
    console.log(req.body);
    //everything gets submitted as a string so we must xss everything in the body
    for (let key in req.body) {
        req.body[key] = xss(req.body[key]);
    }
    try {
        varietyName = pepperValidation.validatePepperName(req.body.varietyName);
        species = pepperValidation.validateSpecies(req.body.species);
        heatLevel = pepperValidation.validateHeatLevel(parseInt(req.body.heatLevel));
        color = pepperValidation.validateColor(req.body.color);
        [sizeCMLower, sizeCMUpper] = pepperValidation.validateSizeCM([parseFloat(req.body.sizeLowerBound), parseFloat(req.body.sizeUpperBound)]);
        console.log(sizeCMLower, sizeCMUpper);
        daysToHarvest = pepperValidation.validateDaysToHarvest(parseInt(req.body.daysToHarvest));
        origin = pepperValidation.validateCountryCode(req.body.originCountryCode);
        altNames = pepperValidation.validateCommaSeparatedAltNames(req.body.altNames);
    } catch (error) {
        // console.log(error);
        return res.render("submission/submission", {serverError: error});
    }
    // console.log(altNames)
    let insPepper
    try {
        insPepper = await peppersData.createPepper(varietyName, altNames, species, heatLevel, color, [sizeCMLower, sizeCMUpper], daysToHarvest, origin);
    } catch (error) {
        res.status(500).json({error: "failed to create pepper"});
    }
    return res.render("submission/submission");
    
})
export default router;