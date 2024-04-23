import { Router } from "express";
const router = Router();
import session from "express-session";
import users from "../data/users.js"

router
.route('/')
.get(async (req, res) => {
  try{
    const top10 = await users.getNClosestWishlistMatches(req.session.user._id, 15);
    return res.render('matching/matches', {users: top10});
  } catch (e) {
    res.status(404).json(e);
  }
});

export default router;