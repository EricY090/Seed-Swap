import { ObjectId } from "mongodb";
import usersValidation from "../usersValidation.js";
import { users } from "../config/mongoCollections.js";
import xss from "xss";

// Create a post under certain user 
const createPost = async (userId, filenames, textPortion) => {
    if (!userId || filenames === undefined || textPortion === undefined) throw "fields incomplete";
    try {
        userId = usersValidation.validateUserId(userId);
        if (typeof(textPortion) !== 'string') throw "textPortion must be string";
        if (textPortion !== xss(textPortion)) throw "textPortion is an xss vulnerability";
    } catch (e) {
        throw e;
    };
    //Check filenames
    if (filenames !== '' && (filenames.slice(0, 11) !== 'data:image/' || filenames.split(';')[1].slice(0, 6) !== 'base64')){
        throw "filename for image is not a base64 string";
    };
    //Check length of textPortion
    if (textPortion.trim().length <10 || textPortion.length > 1500){            // #Character including head/tail spaces < 1500
        throw "Text needs to be at least 10 characters and 1500 maximum";
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
        throw e;
    };

    let UpdatedAllPost = await getAllPost(userId); 
    
    return UpdatedAllPost;
};

// Return the posts array of a certain user
const getAllPost = async (userId) =>{
    if (!userId) throw "fields incomplete";
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


export default {getAllPost, createPost};