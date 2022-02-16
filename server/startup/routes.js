import "express-async-errors";
import express from "express";
import users from "../routes/users.js";
import auth from "../routes/auth.js";
import apps from "../routes/apps.js";
import teams from "../routes/teams.js";
import bugs from "../routes/bugs.js";
import invites from "../routes/invites.js";
import notifications from "../routes/notifications.js";
import cors from "../middlewares/cors.js";
import errors from "../middlewares/errors.js";

export default function (app) {
  app.use(express.json());
  app.use(cors);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/apps", apps);
  app.use("/api/teams", teams);
  app.use("/api/bugs", bugs);
  app.use("/api/invites", invites);
  app.use("/api/notifications", notifications);
  app.use(errors);
}
