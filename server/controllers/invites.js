import Invite from "../models/invite.js";
import { getTeamById } from "./teams.js";
import randomString from "../helpers/randomString.js";
import { addUserToTeam } from "./teams.js";
import { getInviteSchema, sendInviteSchema } from "../validation/invite.js";
import sendEmail from "../helpers/email.js";

export const sendInvite = async (req, res) => {
  const { id } = req.user;
  const { teamId, email } = req.body;

  if (validateInvite({ email })) return res.status(400).send();

  const team = await getTeamById(teamId).populate("owner", "name");
  if (!team) return res.status(400).send();

  if (!team.owner.equals(id)) return res.status(403).send();

  const link = randomString(10);

  const invite = new Invite({
    sender: id,
    team: team._id,
    link: link,
  });

  sendEmail(email, team.owner.name, team.name, link);

  await invite.save();

  res.status(201).send();
};

export const getInvite = async (req, res) => {
  const { link } = req.params;

  if (validateInviteLink({ link })) return res.status(400).send();

  const invite = await Invite.findOne({ link: link, valid: true })
    .populate("team", ["name"])
    .populate("sender", ["name", "avatar"]);

  if (!invite) return res.status(404).send();

  res.send(invite);
};

export const acceptInvite = async (req, res) => {
  const { id } = req.user;
  const { link } = req.params;

  if (validateInviteLink({ link })) return res.status(400).send();

  const invite = await Invite.findOne({ link: link, valid: true });
  if (!invite) return res.status(404).send();

  await addUserToTeam(id, invite.team);

  invite.valid = false;
  await invite.save();

  res.send(201);
};

const validateInvite = (data) => {
  const { error } = sendInviteSchema.validate(data);
  return error;
};

const validateInviteLink = (data) => {
  const { error } = getInviteSchema.validate(data);
  return error;
};
