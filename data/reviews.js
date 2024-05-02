import { users, trades, peppers } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import usersData from "./users.js";
import tradesData from "./trades.js";
import xss from "xss";
import usersValidation from "../usersValidation.js";

// todo validation
const createReview = async (reviewerName, revieweeName, shippingSpeed, packaging, overallExp) => {
    if (!reviewerName || !revieweeName || !shippingSpeed || !packaging || !overallExp) throw "fields incomplete";
    if (typeof reviewerName !== "string" || typeof revieweeName !== "string") throw "User ID fields not strings";
    if (typeof shippingSpeed !== "number" || typeof packaging !== "number" || typeof overallExp !== "number") throw "Review fields not numbers";
    if (shippingSpeed < 1 || shippingSpeed > 5 || packaging < 1 || packaging > 5 || overallExp < 1 || overallExp > 5) throw "Review fields not in range";
    let foundReviewer, foundReviewee;
    try {
        reviewerName = usersValidation.validateUsername(reviewerName);
        revieweeName = usersValidation.validateUsername(revieweeName);
        foundReviewer = await usersData.getUserByName(reviewerName);
        foundReviewee = await usersData.getUserByName(revieweeName);
    } catch (error) {
        throw error;
    }
    let haveTraded = await tradesData.usersHaveTraded(foundReviewer._id.toString(), foundReviewee._id.toString());
    if (!haveTraded) throw "Users have not traded before";
    if (foundReviewer._id.toString() === foundReviewee._id.toString()) throw "Cannot review yourself";
    const usersCollection = await users();

    
    
}


export default {createReview}