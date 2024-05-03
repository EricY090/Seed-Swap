import { Router } from "express";
const router = Router();
import session from "express-session";
import users from "../data/users.js"

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