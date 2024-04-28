import pepperRoutes from "./peppers.js";
// import userRoutes from "./users.js";
import tradeRoutes from "./trades.js";
import authroutes from "./auth_routes.js";
import homepageRoutes from "./homepage.js"
import matchesRoutes from "./matches.js";

const constructorMethod = (app) => {
  app.use("/", authroutes); //base route
  app.use("/homepage", homepageRoutes);
  app.use("/peppers", pepperRoutes);
  // app.use("/users", userRoutes);
  app.use("/trades", tradeRoutes);
  app.use("/matches", matchesRoutes);

  app.use("*", (req, res) => {
    res.status(404).json({ error: req.url });
  });
};

export default constructorMethod;
