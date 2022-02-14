import Team from "../models/team.js";
import _ from "lodash";
import mongoose from "mongoose";
import { getAppById } from "./apps.js";

export const getTeams = async (req, res) => {
  const { id } = req.user;
  const teams = await Team.find({
    $or: [{ owner: id }, { members: id }],
  })
    .sort({ _id: -1 })
    .select(["name", "members", "owner"])
    .populate("members", ["name", "avatar"])
    .populate("owner", ["name", "avatar"])
    .populate("app", "name");

  res.send(teams);
};

export const getMembers = async (req, res) => {
  const { id } = req.user;
  const { appId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(appId)) return res.status(400).send();

  const team = await Team.find({ owner: id, app: appId }).populate("members", [
    "name",
    "avatar",
  ]);

  res.send(team);
};

export const createTeam = async (req, res) => {
  const { id } = req.user;
  const teamData = _.pick(req.body, ["name", "appId"]);

  const app = await getAppById(teamData.appId);

  if (!app) return res.status(400).send();
  if (!app.owner.equals(id)) return res.status(403).send();

  if (await Team.findOne({ app: app._id })) return res.status(400).send();

  const team = new Team({ name: teamData.name, app: app.id, owner: id });

  await team.save();

  const result = {
    _id: team.id,
    name: team.name,
    app: {
      _id: app._id,
      name: app.name,
    },
  };

  res.status(201).send(result);
};

export const deleteTeam = async (req, res) => {
  const { id } = req.user;
  const { id: teamId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(teamId)) return res.status(400).send();

  const team = await Team.findById(teamId);

  if (!team) return res.status(404).send();
  if (!team.owner.equals(id)) return res.status(403).send();

  await Team.deleteOne({ _id: teamId });
  res.send();
};

export const getTeamByAppId = async (appId) => {
  if (!mongoose.Types.ObjectId.isValid(appId)) return null;

  const team = await Team.findOne({ app: appId });
  return team ? team : null;
};

export const getTeamById = async (teamId) => {
  if (!mongoose.Types.ObjectId.isValid(teamId)) return null;

  const team = await Team.findById(teamId);
  return team ? team : null;
};

export const addUserToTeam = async (userId, teamId) => {
  const team = await Team.findById(teamId);

  if (team.members.includes(userId)) return;
  else if (team.owner.equals(userId)) return;

  team.members.push(userId);
  await team.save();
};
