import { Router } from "express";
import { growData } from "../data/index.js";
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
    let userId = req.params.userId;
    let session_id = req.session.user._id
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
        return res.status(500).json({ error: e });
    };

    res.status(200).render("grow/UserPosts", {id: userId, posts: all_posts, ownPage: ownPage});
})
.post(upload.single('Filenames'), async (req, res) => {
    if(!req.session.user){
        return res.status(401).redirect("/login");
    };
    if (!req.body){
        return res.status(400).json({error: "No req body"});
    };
    let session_id = req.session.user._id;
    let userId = req.params.userId;
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

    //Check textPortion
    let textPortion = req.body.textPortion;
    if (textPortion === undefined || typeof(textPortion) !== 'string') return res.status(400).json({error: "textPortion must be string"});
    if (textPortion !== xss(textPortion)) return res.status(400).json({error: "textPortion is an xss vulnerability"})
    if (textPortion.trim().length < 10 || textPortion.length > 1500) return res.status(400).json({error: "Text needs to be at least 10 characters and 1500 maximum"});

    //Check filenames
    let filenames;
    if (!req.file){
        filenames = '';
    }else{
        let image_size = req.file.size /1024/1024;      //Check image size
        if (image_size > 2) return res.status(400).json({error: "The image size must be <2 MB"});
        //Check image extension
        if (req.file.mimetype !== 'image/jpg' && req.file.mimetype !== 'image/jpeg' && req.file.mimetype !== 'image/png' && 
            req.file.mimetype !== 'image/gif' && req.file.mimetype !== 'image/jfif'){
            return res.status(400).json({error: "The image can only be in .jpg, .jpeg, .png, .gif, .jfif"});
        };
        filenames = 'data:' + req.file.mimetype + ';base64, ' + req.file.buffer.toString('base64');
    };

    let all_posts;
    try {
        all_posts = await growData.createPost(userId, filenames, textPortion);
    } catch (e) {
        return res.status(500).json({ error: e});
    };

    res.status(200).render("grow/UserPosts", {id: userId, posts: all_posts, ownPage: ownPage});
});

export default router;