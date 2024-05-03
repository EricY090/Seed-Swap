import { Router } from "express";
const router = Router();
import session from "express-session";
import users from "../data/users.js";
import usersValidation from "../usersValidation.js";

router
.route('/')
.get(async (req, res) => {
  try{
    let cc = undefined;
    if(req.url.includes("originCountryCode")){
      cc = usersValidation.validateCountryCode(req.url.slice(-2).toUpperCase());
      console.log(cc);
    }
    let top15 = await users.getNClosestWishlistMatches(req.session.user._id, 15, ((cc) ? cc : undefined));
    return res.render('matching/matches', {users: top15});
  } catch (e) {
    console.log(e);
    res.status(404).json(e);
  }
});

export default router;