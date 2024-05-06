//pending completed, outgoing
// pending needs form for your approval
// have tradeid as query param

import { Router } from "express";
import { tradesData, usersData, usersPeppersData } from "../data/index.js";
import usersValidation from "../usersValidation.js";
import tradesValidation from "../tradesValidation.js";
import xss from "xss";

const router = Router();

// TODO VALIDATE USER IDS
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
    res.status(500).json({ error });
  }
  for (let trade of tradesPendingYou) {
    trade._id = trade._id.toString()
    try {
      const initiator = await usersData.getUserById(trade.initiator);
      trade.initiatorUsername = initiator.username;
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  //getting trades pending others' approval and transforming them to include the receiver's username
  let tradesPendingOthers;
  try {
    tradesPendingOthers = await tradesData.getTradesPendingOthersApproval(uidstring);
  } catch (error) {
    res.status(500).json({ error });
  }
  for (let trade of tradesPendingOthers) {
    try {
      const receiver = await usersData.getUserById(trade.receiver);
      trade.receiverUsername = receiver.username;
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  //getting your approved trades and transforming them to include both the initiator's and receiver's usernames
  let yourApprovedTrades
  try {
    yourApprovedTrades = await tradesData.getYourApprovedTrades(uidstring);
  } catch (error) {
    res.status(500).json({ error });
  }
  for (let trade of yourApprovedTrades) {
    try {
      const receiver = await usersData.getUserById(trade.receiver);
      trade.receiverUsername = receiver.username;
      const initiator = await usersData.getUserById(trade.initiator);
      trade.initiatorUsername = initiator.username;
    } catch (error) {
      res.status(500).json({ error });
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
  console.log(req.body);
  if(!req.session.user){
    return res.status(401).redirect("/login");
  }
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
    return res.status(400).json({error: "invalid action. can only be approve or decline"});
  }
  let tradeDoc;
  try {
    tradeDoc = await tradesData.getTradeById(tradeId);
  } catch (error) {
    return res.status(500).json({error});
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
      return res.status(500).json({error});
    }
    return res.redirect("/trades");
  }
  if(action === "decline"){
    try {
      await tradesData.receiverDeclines(tradeId);
    } catch (error) {
      console.log(error)
      console.log("bug1")
      return res.status(500).json({error: error});
    }
    return res.redirect("/trades");
  }
  

  res.status(200).render("trades/trades");

})

router
.route("/initiate/:receiverId")
.get(async (req, res) => {
  if(!req.session.user){
    return res.status(401).redirect("/login");
  }
  if(!req.params.receiverId){
    return res.status(400).json({error: "receiverId not provided"});
  }
  const receiverId = req.params.receiverId;
  let receiver;
  // checking if receiverId exists
  try {
    receiver = await usersData.getUserById(receiverId);
  } catch (error) {
    if(error === "User not found"){
      return res.status(404).json({error: "receiver not found"});
    }
    else{
      return res.status(500).json({error});
    }
  }
  if(!receiver){
    return res.status(404).json({error: "receiver not found"});
  }
  // if a user tries initiating a trade with themselves just redirect them to their pending trades
  if(receiver._id.toString() === req.session.user._id.toString()){
    return res.redirect("/trades");
  }
  let initiator
  // if somehow you get here with an invalid userid, redirect to login
  try {
    initiator = await usersData.getUserById(req.session.user._id.toString());
  } catch (error) {
    if(error === "User not found"){
      return res.redirect("/login")
    }
    else{
      return res.status(500).json({error});
    }
  }
  if(!initiator){
    return res.status(404).json({error: "initiator not found"});
  }

  initiator._id = initiator._id.toString();
  receiver._id = receiver._id.toString();

  
  let hbrsObj = {initiator, receiver};



  res.status(200).render("trades/initiate", hbrsObj);
  // res.status(200).render("trades/initiate", {receiver});

})
.post(async (req, res) => {
  if(!req.session.user){
    return res.status(401).redirect("/login");
  }
  if(!req.params.receiverId){
    return res.status(400).json({error: "receiverId not provided"});
  }
  const receiverId = req.params.receiverId;
  let receiver
  try {
    receiver = await usersData.getUserById(receiverId);
  } catch (error) {
    if(error === "User not found"){
      // actually have this redirect to error 404 page
      return res.redirect("/trades")
    } else {
      return res.status(500).json({error: error});
    }
  }
  if(!req.body.initiatorSending){
    return res.status(400).json({error: "initiatorSending not provided"});
  }
  if(!req.body.receiverSending){
    return res.status(400).json({error: "receiverSending not provided"});
  }

  let initiatorSending
  let receiverSending
  try {
    initiatorSending = tradesValidation.validatePepperStrOrArr(req.body.initiatorSending);
    receiverSending = tradesValidation.validatePepperStrOrArr(req.body.receiverSending);
  } catch (error) {
    return res.status(500).json({error: error});
  }

  try {
    let trade = await tradesData.initiateTrade(req.session.user._id.toString(), initiatorSending, receiverId, receiverSending);
    // console.log(trade);
  } catch (error) {
    console.error(error);
    return res.status(500).json({error: error});
  }

  return res.redirect("/trades");
})

export default router;