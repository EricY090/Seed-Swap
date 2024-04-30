import { Router } from "express";
import { peppersData, usersData, moderatorData } from "../data/index.js";
import xss from "xss";

const router = Router();

router
.route("/")
.get(async (req, res) => {
    if(!req.session.user){
        return res.status(401).redirect("/login");
    }
    if(!req.session.user.moderator){
        return res.status(403).redirect("/homepage")
    }
    let unnaprovedPeppers;
    try {
        unnaprovedPeppers = await peppersData.getAllPeppersUnappr();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    if(unnaprovedPeppers.length === 0){
        res.status(200).render("moderator/moderator");
        return
    }
    res.render("moderator/moderator", {peppers: unnaprovedPeppers});
    return
})
.post(async (req, res) => {
    if(!req.session.user){
        return res.status(401).redirect("/login");
    }
    if(!req.session.user.moderator){
        return res.status(403).redirect("/homepage")
    }
    let pepperId
    if(!req.body.pepperId){
        return res.status(400).json({error: "pepperId field not provided"});
    }else{
        pepperId = req.body.pepperId;
    }
    if(pepperId !== xss(pepperId)){
        return res.status(400).json({error: "pepperId is an xss vulnerability"});
    }
    if(typeof pepperId !== "string"){
        return res.status(400).json({error: "pepperId not a string"});
    }
    if(!req.body.action){
        return res.status(400).json({error: "action field incomplete"});
    }
    let action = req.body.action;
    if(action !== xss(action)){
        return res.json({error: "action is an xss vulnerability"});
    }
    if(typeof action !== "string"){
        return res.status(400).json({error: "action not a string"});
    }
    if(action !== "approve" && action !== "disapprove"){
        return res.status(400).json({error: "invalid action. can only be approve or disapprove"});
    }
    if(action === "approve"){
        try {
            await moderatorData.approvePepperById((req.session.user._id).toString(), pepperId, true);
        } catch (error) {
            res.status(500).json({ error: error.message });
            return
        }
        return res.redirect("/moderator");
    }
    if(action === "disapprove"){
        try {
            await moderatorData.approvePepperById((req.session.user._id).toString(), pepperId, false);
        } catch (error) {
            res.status(500).json({ error: error.message });
            return
        }
        return res.redirect("/moderator");
    }

});

export default router;