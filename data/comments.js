import { users } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import usersData from "./users.js";
import usersValidation from "../usersValidation.js";
import xss from "xss";

/**
 *
 * @param {string} commenterId
 * @param {string} pageBeingCommentedId
 * @param {object} comment
 * @returns
 */
const addComment = async (commenterId, pageBeingCommentedId, comment) => {
  //check if params provided
  if (!commenterId || !pageBeingCommentedId || !comment)
    throw "fields incomplete";
  if (
    typeof commenterId !== "string" ||
    typeof pageBeingCommentedId !== "string" ||
    typeof comment !== "string"
  )
    throw "fields not strings";

  //validation
  try {
    commenterId = usersValidation.validateUserId(commenterId);
    pageBeingCommentedId = usersValidation.validateUserId(pageBeingCommentedId);
  } catch (error) {
    throw error;
  }
  //xss check
  if (commenterId !== xss(commenterId))
    throw "commenterId is an xss vulnerability";
  if (pageBeingCommentedId !== xss(pageBeingCommentedId))
    throw "pageBeingCommented is an xss vulnerability";
  comment = xss(comment);
  if(comment.trim().length <=4) throw "Comment is less than 5 characters long";

  //grabbing users collection, checking if users exist
  const userCollection = await users();
  let commentingUser;
  let commentedUser;
  try {
    commentingUser = await usersData.getUserById(commenterId);
    commentedUser = await usersData.getUserById(pageBeingCommentedId);
  } catch (error) {
    throw error;
  }
  if (!commentingUser) throw "User making comment not found";
  if (!commentedUser) throw "User being commented on not found";

  //creating new comment object
  let newComment = {
    _id: new ObjectId(),
    commenterUsername: commentingUser.username,
    text: comment,
  };

  //updating user collection with new comment
  let updateRes;
  try {
    updateRes = await userCollection.updateOne(
      { _id: new ObjectId(pageBeingCommentedId) },
      { $push: { profileComments: newComment } }
    );
  } catch (error) {
    throw error;
  }
  //throwing if some mongo error
  if (updateRes.modifiedCount === 0) throw "Comment not added";
  if (updateRes.acknowledged === false) throw "Comment not added";

  return newComment;
};

export default { addComment };
