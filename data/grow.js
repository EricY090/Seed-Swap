import { ObjectId } from "mongodb";
import usersValidation from "../usersValidation.js";
import { users } from "../config/mongoCollections.js";
import xss from "xss";

// Create a post under certain user 
const createPost = async (userId, filenames, textPortion) => {
    if (!userId || filenames === undefined || textPortion === undefined) throw "fields incomplete";
    userId = xss(userId);
    try {
        userId = usersValidation.validateUserId(userId);
        if (typeof(textPortion) !== 'string') throw "Text portion must be string";
    } catch (e) {
        throw e;
    };

    let usersCollection = await users();
    try {
        let user = await usersCollection.findOne({ _id: new ObjectId(userId) });
        if (!user) throw "User not found";
    } catch (e) {
        throw e;
    }
    let insertDate = new Date();
    insertDate = insertDate.toUTCString();
    let new_post = {_id: new ObjectId(), Filenames: filenames, textPortion: textPortion, insertDate};
    try{
        await usersCollection.updateOne({_id: new ObjectId(userId)}, {$push: {growLog: new_post}});
    }catch(e){
        throw "User not found!";
    };

    let UpdatedAllPost = await getAllPost(userId); 
    
    return UpdatedAllPost;
};

// Return the posts array of a certain user
const getAllPost = async (userId) =>{
    if (!userId) throw "fields incomplete";
    userId = xss(userId);
    try {
        userId = usersValidation.validateUserId(userId);
    } catch (e) {
        throw e;
    }
    let usersCollection = await users();
    let user;
    try {
        user = await usersCollection.findOne({ _id: new ObjectId(userId) });
    } catch (e) {
        throw e;
    }
    if (!user) throw "User not found";

    return user.growLog;
};

const getPostByID = async (postId) =>{
    if (!postId) throw "fields incomplete";
    try {
        postId = usersValidation.validateUserId(postId);
    }catch(e) {
        throw e;
    };

    let usersCollection = await users();
    let target_post;
    try {
        target_post = await usersCollection.findOne({'growLog._id': new ObjectId(postId)}, {projection: {_id: 0, 'growLog.$': 1}});
        if (!target_post) throw "Post not found";
    } catch (e) {
        throw e;
    };

    return target_post[0];
};


export default {getAllPost, createPost, getPostByID};