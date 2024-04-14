import express from "express";
const app = express();
import configRoutes from "./routes/index.js";
import session from "express-session";

app.use(express.json());
app.use(
  session({
    name: "sessionCookie",
    secret: "SevenSamurai",
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 1000 * 60 * 30 }, // maxAge = 30 minutes
  })
);

app.use("/public", express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
node;
