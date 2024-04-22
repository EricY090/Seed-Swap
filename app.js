import express from "express";
const app = express();
import configRoutes from "./routes/index.js";
import session from "express-session";
import exphbs from "express-handlebars";

app.use("/public", express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    name: "sessionCookie",
    secret: "SevenSamurai", //this is one of my favorite movies
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 1000 * 60 * 30 }, // maxAge = 30 minutes
  })
);

//middleware for login and registration

//Root Route Middleware
app.use('/', (req, res, next) => {
  let aut = "(Non-Authenticated User)"
  let d = new Date().toUTCString()
  if(req.session.user){
    aut = "(Authenticated User)"
  }
  console.log("[" + d + "]: " + req.method + " " + req.originalUrl + " / " + aut)
  if(req.path == "/"){
  if(req.session.user){
    console.log(req.session.user);
    return res.redirect('/homepage')
  }
  else{
    return res.redirect('/login')
  }
  }
  next();
})

//Login Middleware
app.use("/login", (req,res,next) =>{
  if(req.session.user){ //If User is logged in, redirect them to the homepage
    return res.redirect('/homepage');
  }
  else{ //continue if not logged in
    next();
  }
})

//Registration Middleware
app.use("/register", (req,res,next) =>{
  if(req.session.user){ //If User is logged in, redirect them to the homepage
    return res.redirect('/homepage');
  }
  else{ //continue if not logged in
    next();
  }
})
//

//logout middleware
app.use('/logout', (req,res, next) => {
  if(req.session.user){
    req.session.destroy();
    next();
  }
  else{
    req.method="GET"
    return res.redirect("/login")
  }
});
//

//Homepage middleware
app.use("/homepage", (req,res,next) =>{
  if(req.session.user){ //If User is logged in, fall through to homepage
    next();
  }
  else{ //else redirect them to login
    return res.redirect('/login');
  }
})
//

app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
