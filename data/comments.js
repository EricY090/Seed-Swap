import { users } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import usersData from "./users.js";
import usersValidation from "../usersValidation.js";
import xss from "xss";

/**
 *
 * @param {sting} commenterId
 * @param {string} pageBeingCommentedId
 * @param {object} comment
 * @returns
 */
const addComment = async (commenterId, pageBeingCommentedId, comment) => {
  if (!commenterId || !pageBeingCommentedId || !comment)
    throw "fields incomplete";
  if (
    typeof commenterId !== "string" ||
    typeof pageBeingCommentedId !== "string" ||
    typeof comment !== "string"
  )
    throw "fields not strings";
  try {
    commenterId = usersValidation.validateUserId(commenterId);
    pageBeingCommentedId = usersValidation.validateUserId(pageBeingCommentedId);
  } catch (error) {
    throw error;
  }
  if (commenterId !== xss(commenterId))
    throw "commenterId is an xss vulnerability";
  if (pageBeingCommentedId !== xss(pageBeingCommentedId))
    throw "pageBeingCommented is an xss vulnerability";
  comment = xss(comment);

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

  let newComment = {
    _id: new ObjectId(),
    commenterUsername: commentingUser.username,
    text: comment,
  };

  let updateRes;
  try {
    updateRes = await userCollection.updateOne(
      { _id: new ObjectId(pageBeingCommentedId) },
      { $push: { profileComments: newComment } }
    );
  } catch (error) {
    throw error;
  }
  if (updateRes.modifiedCount === 0) throw "Comment not added";
  if (updateRes.acknowledged === false) throw "Comment not added";

  return newComment;
};

export default { addComment };
