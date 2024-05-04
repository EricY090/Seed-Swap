import { Router } from "express";
import { growData, usersData, moderatorData } from "../data/index.js";
import xss from "xss";
import usersValidation from "../usersValidation.js";
import multer from "multer";

const router = Router();
const upload = multer({});

router
.route("/:userId")
.get(async (req, res) => {
    if(!req.session.user){
        return res.status(401).redirect("/login");
    }
    let userId = xss(req.params.userId);
    let session_id = xss(req.session.user._id)
    try {
        session_id = usersValidation.validateUserId(session_id)
        userId = usersValidation.validateUserId(userId);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    };
    let ownPage = false;
    if (session_id === userId) ownPage = true

    let all_posts;
    try {
        all_posts = await growData.getAllPost(userId);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    };

    res.status(200).render("grow/UserPosts", {id: userId, posts: all_posts, ownPage: ownPage});
})
.post(upload.single('Filenames'), async (req, res) => {
    if(!req.session.user){
        return res.status(401).redirect("/login");
    };
    if (!req.body){
        return res.status(400).json({error: "No req body"});
    }
    let session_id = xss(req.session.user._id);
    let userId = xss(req.params.userId);
    try {
        userId = usersValidation.validateUserId(userId);
        session_id = usersValidation.validateUserId(session_id);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    };

    let ownPage = false;
    if (session_id === userId) ownPage = true;
    if (!ownPage){
        return res.status(401).json({error: "No permission to add posts under other's page"})
    };

    let filenames = 'data:' + req.file.mimetype + ';base64, ' + req.file.buffer.toString('base64');
    let textPortion = req.body.textPortion;
    if (typeof(textPortion) !== 'string') return res.status(400).json({error: "textPortion must be string"});
    
    let all_posts;
    try {
        all_posts = await growData.createPost(userId, filenames, textPortion);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    };

    res.status(200).render("grow/UserPosts", {id: userId, posts: all_posts, ownPage: ownPage});
});

export default router;