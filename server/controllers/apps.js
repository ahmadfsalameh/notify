import App from "../models/app.js";
import _ from "lodash";
import mongoose from "mongoose";
import { getTeamByAppId } from "./teams.js";
import { getAppBugsById } from "./bugs.js";
import randomString from "../helpers/randomString.js";

export const getApps = async (req, res) => {
  const { id } = req.user;

  const apps = await App.find({ owner: id })
    .select(["name", "apiKey"])
    .sort({ _id: -1 });
  res.send(apps);
};

export const getAppsWithBugs = async (req, res) => {
  const { id } = req.user;

  await App.find({ owner: id })
    .select(["name", "apiKey"])
    .sort({ _id: -1 })
    .lean()
    .exec((err, apps) => {
      const length = apps.length;
      if (!length) res.send(apps);
      let count = 0;
      apps.forEach(async (app) => {
        app.team = await getTeamByAppId(app._id);
        app.bugs = await getAppBugsById(app._id);
        if (++count == length) res.send(apps);
      });
    });
};

export const createApp = async (req, res) => {
  const { id } = req.user;
  const name = req.body.name;

  const apiKey = randomString(20);
  const owner = id;

  const app = new App({ name, apiKey, owner });

  await app.save(app);

  res.status(201).send(_.pick(app, ["_id", "name", "apiKey"]));
};

export const deleteApp = async (req, res) => {
  const { id } = req.user;
  const { appId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(appId)) return res.status(400).send();

  const app = await App.findById(appId);

  if (!app) return res.status(404).send();
  if (!app.owner.equals(id)) {
    return res.status(403).send(app);
  }

  await App.deleteOne({ _id: appId });
  res.send();
};

export const getAppById = async (appId) => {
  if (!mongoose.Types.ObjectId.isValid(appId)) return null;

  const app = await App.findOne({ _id: appId });
  return app ? app : null;
};

export const getAppByApiKey = async (apiKey) => {
  const app = await App.findOne({ apiKey: apiKey });
  return app ? app : null;
};
