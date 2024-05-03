import { Router } from "express";
const router = Router();
import session from "express-session";
import users from "../data/users.js"
import commentsData from "../data/comments.js";
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
    res.redirect(`/user/${req.params.username}`);
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