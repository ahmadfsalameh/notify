import Invite from "../models/invite.js";
import { getTeamById } from "./teams.js";
import randomString from "../helpers/randomString.js";
import { addUserToTeam } from "./teams.js";

export const sendInvite = async (req, res) => {
  const { id } = req.user;
  const { teamId, email } = req.body;

  const team = await getTeamById(teamId);
  if (!team) return res.status(400).send();

  if (!team.owner.equals(id)) return res.status(403).send();

  const link = randomString(10);

  const invite = new Invite({
    sender: id,
    team: team._id,
    link: link,
  });

  await invite.save();

  res.status(201).send();
};

export const getInvite = async (req, res) => {
  const { link } = req.params;

  const invite = await Invite.findOne({ link: link, valid: true })
    .populate("team", ["name"])
    .populate("sender", ["name", "avatar"]);

  if (!invite) return res.status(404).send();

  res.send(invite);
};

export const acceptInvite = async (req, res) => {
  const { id } = req.user;
  const { link } = req.params;

  const invite = await Invite.findOne({ link: link, valid: true });
  if (!invite) return res.status(404).send();

  await addUserToTeam(id, invite.team);

  invite.valid = false;
  await invite.save();

  res.send(201);
};
