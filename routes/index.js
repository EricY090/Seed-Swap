import pepperRoutes from "./peppers.js";
import userRoutes from "./users.js";
import tradeRoutes from "./trades.js";
import authroutes from "./auth_routes.js";
import homepageRoutes from "./homepage.js"
import matchesRoutes from "./matches.js";
import moderatorRoutes from "./moderator.js";
import submissionRoutes from "./submission.js";

const constructorMethod = (app) => {
  app.use("/", authroutes); //base route
  app.use("/homepage", homepageRoutes);
  app.use("/peppers", pepperRoutes);
  app.use("/user", userRoutes);
  app.use("/trades", tradeRoutes);
  app.use("/matches", matchesRoutes);
  app.use("/moderator", moderatorRoutes);
  app.use("/submission", submissionRoutes);

  app.use("*", (req, res) => {
    res.status(404).json({ error: req.url });
  });
};

export default constructorMethod;
