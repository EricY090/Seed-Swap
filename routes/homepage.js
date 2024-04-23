import { Router } from "express";
import users from "../data/users.js";
const router = Router();
import session from "express-session";

router
.route('/')
.get(async (req, res) => {
    try {
      //console.log(users)
      const user = await users.getUserById(req.session.user._id);
      return res.render('home/homepage', {user: user});
    } catch(e){
      throw(e);
    }
  });

export default router;
