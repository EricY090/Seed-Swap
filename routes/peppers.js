import { Router } from "express";
const router = Router();
import session from "express-session";

router
.route('/')
.get(async (req, res) => {
    return res.render('peppers');
  });

export default router;
