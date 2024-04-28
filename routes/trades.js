//pending completed, outgoing
// pending needs form for your approval
// have tradeid as query param

import { Router } from "express";
import { tradesData, usersData } from "../data/index.js";
import xss from "xss";

const router = Router();

router
.route("/")
.get(async (req, res) => {

  if(!req.session.user){
    return res.status(401).redirect("/login");
  }
  const user = req.session.user;
  const uidstring = user._id.toString();

  //getting trades pending your approval and transforming them to include the initiator's username
  let tradesPendingYou;
  try {
    tradesPendingYou = await tradesData.getTradesPendingYourApproval(uidstring);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  for (let trade of tradesPendingYou) {
    trade._id = trade._id.toString()
    try {
      const initiator = await usersData.getUserById(trade.initiator);
      trade.initiatorUsername = initiator.username;
    } catch (error) {
      console.error(error);
    }
  }

  //getting trades pending others' approval and transforming them to include the receiver's username
  let tradesPendingOthers;
  try {
    tradesPendingOthers = await tradesData.getTradesPendingOthersApproval(uidstring);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  for (let trade of tradesPendingOthers) {
    try {
      const receiver = await usersData.getUserById(trade.receiver);
      trade.receiverUsername = receiver.username;
    } catch (error) {
      console.error(error);
    }
  }

  //getting your approved trades and transforming them to include both the initiator's and receiver's usernames
  let yourApprovedTrades
  try {
    yourApprovedTrades = await tradesData.getYourApprovedTrades(uidstring);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  for (let trade of yourApprovedTrades) {
    try {
      const receiver = await usersData.getUserById(trade.receiver);
      trade.receiverUsername = receiver.username;
      const initiator = await usersData.getUserById(trade.initiator);
      trade.initiatorUsername = initiator.username;
    } catch (error) {
      console.error(error);
    }
  }
  let hbrsObj = {};
  if(tradesPendingYou.length > 0){
    hbrsObj.tradesPendingYou = tradesPendingYou;
  }
  if(tradesPendingOthers.length > 0){
    hbrsObj.tradesPendingOthers = tradesPendingOthers;
  }
  if(yourApprovedTrades.length > 0){
    hbrsObj.yourApprovedTrades = yourApprovedTrades;
  }

  res.status(200).render("trades/trades", hbrsObj);
})
.post(async (req, res) => {
  if(!req.body.tradeId){
    return res.status(400)
  }
  const tradeId = req.body.tradeId;
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
  if(action !== "approve" && action !== "decline"){
    return res.status(400).json({error: "invalid action"});
  }
  let tradeDoc;
  try {
    tradeDoc = await tradesData.getTradeById(tradeId);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
  if(!tradeDoc){
    return res.status(404).json({error: "trade not found"});
  }
  if(tradeDoc.receiver !== req.session.user._id.toString()){
    return res.status(403).json({error: "you are not the receiver of this trade"});
  }
  if(tradeDoc.receiverAccepted){
    return res.status(400).json({error: "you have already accepted this trade"});
  }
  if(action === "approve"){
    try {
      await tradesData.receiverAccepts(tradeId);
    } catch (error) {
      return res.status(500).json({error: error.message});
    }
    return res.redirect("/trades");
  }
  if(action === "decline"){
    try {
      await tradesData.receiverRejects(tradeId);
    } catch (error) {
      return res.status(500).json({error: error.message});
    }
    return res.redirect("/trades");
  }
  

  res.status(200).render("trades/trades");

})


export default router;