import pepperRoutes from "./peppers.js";
import userRoutes from "./users.js";
import tradeRoutes from "./trades.js";

const constructorMethod = (app) => {
  app.use("/peppers", pepperRoutes);
  app.use("/users", userRoutes);
  app.use("/trades", tradeRoutes);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};
