import { Router } from "express";
import { usersData } from "../data/index.js";
import xss from "xss";
import session from "express-session";
import bcryptjs from "bcryptjs";
import usersValidation from "../usersValidation.js";

const router = Router();

//for now we'll just have the login post route serve json instead of redirecting to another page
router.post("/", async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ error: "fields incomplete" });
    return;
  }
  if (typeof username !== "string" || typeof password !== "string") {
    res.status(400).json({ error: "fields not strings" });
    return;
  }
  if (username !== xss(username)) {
    res.status(400).json({ error: "username is an xss vulnerability" });
    return;
  }
  if (password !== xss(password)) {
    res.status(400).json({ error: "password is an xss vulnerability" });
    return;
  }
  try {
    usersValidation.validateUsername(username);
    //console.log(username);
    usersValidation.validatePassword(password);
    //console.log(password);
  } catch (error) {
    res.status(400).json({ error: error });
    return;
  }
  let foundUser;
  try {
    foundUser = await usersData.login(username, password);
  } catch (error) {
    res.status(400).json({ error: "Username or password incorrect" });
    return;
  }
  if (foundUser) {
    req.session.user = foundUser;
    console.log(req.session.user);
    res.status(200).json({ message: "Login success" });
  } else {
    res.status(400).json({ error: "Username or password incorrect" });
  }
});
export default router;
