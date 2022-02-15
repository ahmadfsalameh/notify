import Bug, { bugStatus } from "../models/bug.js";
import _ from "lodash";
import mongoose from "mongoose";
import { getTeamByAppId } from "./teams.js";
import { getAppByApiKey } from "./apps.js";

export const getBugs = async (req, res) => {
  const { id } = req.user;

  const appBugs = await Bug.find({ owner: id })
    .populate("assignee", "name")
    .sort({ _id: -1 });

  res.send(appBugs);
};

export const getTasks = async (req, res) => {
  const { id } = req.user;

  const tasks = await Bug.find({ assignee: id })
    .populate("app", "name")
    .sort({ index: 1 });
  res.send(tasks);
};

export const getAppBugsById = async (appId) => {
  return await Bug.find({ app: appId });
};

export const createBug = async (req, res) => {
  const bugData = req.body.bug;
  const apiKey = req.body.apiKey;

  const app = await getAppByApiKey(apiKey);
  if (!app) return res.status(400).send();

  const bug = new Bug({ app: app._id, owner: app.owner, ...bugData });
  await bug.save();

  res.status(201).send(bug);
};

export const assignBugToUser = async (req, res) => {
  const { id } = req.user;
  const { bugId } = req.params;

  const { assignee } = req.body;

  if (
    !mongoose.Types.ObjectId.isValid(bugId) ||
    !mongoose.Types.ObjectId.isValid(assignee)
  )
    return res.status(400).send(assignee);

  const bug = await Bug.findById(bugId).populate("app", "owner");
  if (!bug) return res.status(404).send();

  if (id !== assignee) {
    const team = await getTeamByAppId(bug.app);
    if (!team) return res.status(400).send();
    if (!team.owner.equals(id)) return res.status(403).send();
    if (!team.members.includes(assignee)) return res.status(400).send();
  } else {
    if (!bug.app.owner.equals(id)) return res.status(403).send();
  }

  bug.set({
    assignee: assignee,
    status: "open",
  });

  await Bug.updateMany(
    {
      status: "open",
      assignee: assignee,
    },
    {
      $inc: { index: 1 },
    }
  );

  await bug.save();

  res.send();
};

export const changeBugStatusAndIndex = async (req, res) => {
  const { id } = req.user;
  const { bugId } = req.params;

  const { status, index } = req.body;

  if (!mongoose.Types.ObjectId.isValid(bugId)) return res.status(400).send();

  if (!bugStatus.includes(status)) return res.status(400).send();

  const bug = await Bug.findById(bugId);
  if (!bug) return res.status(404).send();

  if (!bug.assignee.equals(id)) return res.status(403).send();

  await changeAffectedBugsIndexes(bug, status, index);

  bug.set({
    status: status,
    index: index,
  });

  await bug.save();
  res.send();
};

const changeAffectedBugsIndexes = async (bug, status, index) => {
  const { id, status: prevStatus, index: prevIndex, assignee } = bug;

  if (prevStatus === status) {
    if (prevIndex < index) {
      await Bug.updateMany(
        {
          status: status,
          assignee: assignee,
          index: { $gt: prevIndex, $lte: index },
        },
        {
          $inc: { index: -1 },
        }
      );
    } else {
      await Bug.updateMany(
        {
          status: status,
          assignee: assignee,
          index: { $lt: prevIndex, $gte: index },
        },
        {
          $inc: { index: 1 },
        }
      );
    }
    return;
  }

  await Bug.updateMany(
    {
      status: prevStatus,
      assignee: assignee,
      index: { $gt: prevIndex },
    },
    {
      $inc: { index: -1 },
    }
  );

  await Bug.updateMany(
    {
      status: status,
      assignee: assignee,
      index: { $gte: index },
    },
    {
      $inc: { index: 1 },
    }
  );
};
