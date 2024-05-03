import { users, trades, peppers } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import usersData from "./users.js";
import tradesData from "./trades.js";
import xss from "xss";
import usersValidation from "../usersValidation.js";

// todo validation
/**
 * 
 * @param {string} reviewerName 
 * @param {string} revieweeName 
 * @param {number} shippingSpeed 
 * @param {number} packaging 
 * @param {number} overallExp 
 * @returns {object} updated user (reviewee) object
 * @throws {string} type errors, field incompleetes, usernot found, mongo errors
 */

const createReview = async (reviewerName, revieweeName, shippingSpeed, packaging, overallExp) => {
    if (!reviewerName || !revieweeName || !shippingSpeed || !packaging || !overallExp) throw "fields incomplete";
    if (typeof reviewerName !== "string" || typeof revieweeName !== "string") throw "User ID fields not strings";
    if(reviewerName !== xss(reviewerName)) throw "reviewerName is an xss vulnerability";
    if (typeof shippingSpeed !== "number" || typeof packaging !== "number" || typeof overallExp !== "number") throw "Review fields not numbers";
    if(isNaN(shippingSpeed) || isNaN(packaging) || isNaN(overallExp)) throw "Review fields not numbers";
    if(!Number.isInteger(shippingSpeed) || !Number.isInteger(packaging) || !Number.isInteger(overallExp)) throw "Review fields not integers";
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
    let alreadyReviewed = await userHasLeftReview(reviewerName, revieweeName);
    if (alreadyReviewed) throw "User has already left a review for this user";
    if (foundReviewer._id.toString() === foundReviewee._id.toString()) throw "Cannot review yourself";
    const usersCollection = await users();
    // check if reviewer already left a review
    const review = {
        reviewer: foundReviewer.username,
        shippingSpeed: shippingSpeed,
        packaging: packaging,
        overallExp: overallExp
    };
    let ackObj = await usersCollection.updateOne({ username: revieweeName }, { $push: { reviews: review } });
    if (ackObj.matchedCount === 0) throw "User not found";
    if (ackObj.modifiedCount === 0) throw "Review not added";
    let reviewee
    try {
        reviewee = await usersData.getUserByName(revieweeName);
    } catch (error) {
        throw error;
    }
    let totalReviews = reviewee.reviews.length;
    let totalShippingSpeed = 0;
    let totalPackaging = 0;
    let totalOverallExp = 0;
    for (let review of reviewee.reviews) {
        totalShippingSpeed += review.shippingSpeed;
        totalPackaging += review.packaging;
        totalOverallExp += review.overallExp;
    }
    let newShippingSpeed = Number((totalShippingSpeed / totalReviews).toFixed(2));
    let newPackaging = Number((totalPackaging / totalReviews).toFixed(2));
    let newOverallExp = Number((totalOverallExp / totalReviews).toFixed(2));
    let ackObj2 = await usersCollection.updateOne({ username: revieweeName }, { $set: { avgRatingShipping: newShippingSpeed, avgRatingPackaging: newPackaging, avgRatingOverall: newOverallExp } });
    if (ackObj2.matchedCount === 0) throw "User not found";
    if (ackObj2.modifiedCount === 0) throw "Average ratings not updated";
    let updatedUser
    try {
        updatedUser = await usersData.getUserByName(revieweeName);
    } catch (error) {
        throw error;
    }
    return updatedUser;
}


/**
 * 
 * @param {string} reviewerName 
 * @param {string} revieweeName 
 * @returns {boolean} if user has left a review for another user
 * @throws {string} fields incomplete, type errors, usernot found, mongo errors
 */
const userHasLeftReview = async (reviewerName, revieweeName) => {
    if (!reviewerName || !revieweeName) throw "fields incomplete";
    if (typeof reviewerName !== "string" || typeof revieweeName !== "string") throw "User ID fields not strings";
    if(reviewerName !== xss(reviewerName)) throw "reviewerName is an xss vulnerability";
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
    if (!haveTraded) return false
    if (foundReviewer._id.toString() === foundReviewee._id.toString()) throw "Cannot review yourself";
    for (let review of foundReviewee.reviews) {
        if (review.reviewer === reviewerName) return true;
    }
    return false;
}


/**
 * 
 * @param {string} username 
 * @returns {object[]} reviews
 */
const getReviews = async (username) => {
    if (!username) throw "fields incomplete";
    if (typeof username !== "string") throw "fields not strings";
    if(username !== xss(username)) throw "username is an xss vulnerability";
    let foundUser
    try {
        username = usersValidation.validateUsername(username);
        foundUser = await usersData.getUserByName(username);
    } catch (error) {
        throw error;
    }
    return foundUser.reviews;
}


export default {createReview, userHasLeftReview, getReviews}