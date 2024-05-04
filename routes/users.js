import { Router } from "express";
const router = Router();
import session from "express-session";
import users from "../data/users.js"
import commentsData from "../data/comments.js";
import { reviewsData, tradesData } from "../data/index.js";
import xss from "xss";

router
.route('/')
.get(async (req, res) => {
    res.status(404).json({error: "Can't be here, kiddo."})
});

router
.route('/:username')
.get(async (req, res) => {
    try{
        let user = await users.getUserByName(req.params.username);
        user._id = user._id.toString();
        res.render('users/user', {user: user});
    } catch (e) {
        console.log(e);
        res.status(404).json({error: "No guy!"})
    }
});

router
.route('/:username/comment')
.post(async (req, res) => {
    if(!req.session.user){
        return res.status(401).redirect('/login')
    }
    let userBeingCommented
    let errField
    try{
        userBeingCommented = await users.getUserByName(req.params.username);
    } catch (e) {
        console.log(e);
        return res.status(404).json({error: "No guy!"})
    }
    let commenter = req.session.user;
    let comment = req.body.comment;
    if(!comment){
        errField = "Comment must be greater than 4 characters"
        return res.render('users/user', {user: userBeingCommented, errField: errField});
    }
    if(typeof comment !== "string"){
        errField = "Comment must be a string"
        return res.render('users/user', {user: userBeingCommented, errField: errField});
    }
    if(xss(comment) !== comment){
        errField = "nice try... we detected an xss vulnerability in your comment."
        return res.render('users/user', {user: userBeingCommented, errField: errField});
    }
    if(comment.trim().length <= 4){
        errField = "Comment must be greater than 4 characters"
        return res.render('users/user', {user: userBeingCommented, errField: errField});
    }
    try {
        await commentsData.addComment(commenter._id.toString(), userBeingCommented._id.toString(), comment);
    } catch (error) {
        if(error === "Comment is less than 5 characters long"){
            errField = "Comment must be greater than 4 characters"
        } else {
            errField = "Comment not added"
        }
        return res.render('users/user', {user: userBeingCommented, errField: errField});
    }
    // if successfully added comment, render user page w/ updated user info
    try {
        userBeingCommented = await users.getUserByName(req.params.username);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Comment not added"})
    }
    userBeingCommented._id = userBeingCommented._id.toString();
    //res.redirect(`/user/${req.params.username}`);
    // console.log(userBeingCommented);
    return res.json(userBeingCommented);
});

router
.route('/:username/reviews')
.get(async (req, res) => {

    if(!req.session.user){
        return res.status(401).redirect('/login')
    }
    let userBeingViewed
    try{
        userBeingViewed = await users.getUserByName(req.params.username);
        userBeingViewed._id = userBeingViewed._id.toString();
    } catch (error) {
        return res.status(404).json({error: "No guy!"})
    }
    let listOfPeopleTradedWith
    try {
        listOfPeopleTradedWith = await tradesData.findPeopleUserHasTradedWith(userBeingViewed._id);        
    } catch (error) {
        return res.status(500).json({error: "Error finding people user has traded with"})
    }
    let showReviewForm = false;
    let userHasLeftReview;
    let userIsSelf = (req.session.user.username === req.params.username);
    let usersHaveTraded = listOfPeopleTradedWith.includes(req.session.user.username);
    try {
        userHasLeftReview = await reviewsData.userHasLeftReview(req.session.user.username, req.params.username);
    } catch (error) {
        res.status(500).json({error: "Error finding if users have traded"})
    }

    if(!userIsSelf && usersHaveTraded && !userHasLeftReview){
        showReviewForm = true;
    }
    console.log(`userHasLeftReview: ${userHasLeftReview}`)
    console.log(`listOfPeopleTradedWith: ${listOfPeopleTradedWith}`)
    console.log(`userIsSelf: ${userIsSelf}`)
    console.log(`usersHaveTraded: ${usersHaveTraded}`)
    let hbrsObj = {user: userBeingViewed, peopleTradedWith: listOfPeopleTradedWith, showReviewForm: showReviewForm}

    return res.render('users/reviews', hbrsObj);

})
.post(async (req, res) => {
    if(!req.session.user){
        return res.status(401).redirect('/login')
    }
    console.log(req.body)
    if(!req.body.shippingSpeed || !req.body.packaging || !req.body.overallExp){
        return res.status(400).json({error: "Missing fields"})
    }
    let shippingSpeed = req.body.shippingSpeed;
    let packaging = req.body.packaging;
    let overallExp = req.body.overallExp;
    for (let key in req.body) {
        req.body[key] = xss(req.body[key]);
    }
    if(parseInt(shippingSpeed) < 1 || parseInt(shippingSpeed) > 5 || parseInt(packaging) < 1 || parseInt(packaging) > 5 || parseInt(overallExp) < 1 || parseInt(overallExp) > 5){
        return res.status(400).json({error: "Invalid rating"})
    }
    shippingSpeed = parseInt(shippingSpeed);
    packaging = parseInt(packaging);
    overallExp = parseInt(overallExp);

    let userBeingReviewed
    try{
        userBeingReviewed = await users.getUserByName(req.params.username);
    } catch (e) {
        return res.status(404).json({error: "No guy!"})
    }
    let listOfPeopleTradedWith
    try {
        listOfPeopleTradedWith = await tradesData.findPeopleUserHasTradedWith(userBeingReviewed._id.toString());        
    } catch (error) {
        return res.status(500).json({error: "Error finding people user has traded with"})
    }
    let userHasLeftReview;
    let userIsSelf = (req.session.user.username === req.params.username);
    let usersHaveTraded = listOfPeopleTradedWith.includes(req.session.user.username);
    try {
        userHasLeftReview = await reviewsData.userHasLeftReview(req.session.user.username, req.params.username);
    } catch (error) {
        res.status(500).json({error: "Error finding if users have traded"})
    }
    if(userIsSelf){
        return res.status(400).json({error: "silly goose... you cant review yourself"})
    }
    if(!usersHaveTraded){
        return res.status(400).json({error: "You have not traded with this user"})
    }
    if(userHasLeftReview){
        return res.status(400).json({error: "You have already left a review for this user"})
    }
    try {
        await reviewsData.createReview(req.session.user.username, req.params.username, shippingSpeed, packaging, overallExp);
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Error creating review"})
    }

    return res.redirect(`/user/${req.params.username}/reviews`);
    



});


router
.route('/:username/glog')
.get(async (req, res) => {
    try{
        let user = await users.getUserByName(req.params.username);
        user._id = user._id.toString();
        res.render('users/glog', {user: user});
    } catch (e) {
        console.log(e);
        res.status(404).json({error: "No guy!"})
    }
});

export default router;