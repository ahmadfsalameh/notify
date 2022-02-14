import User from "../models/user.js";
import _ from "lodash";
import bcrypt from "bcrypt";
import configs from "../configs.js";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/avatars-bottts-sprites";

export const getUser = async (req, res) => {
  const { id } = req.user;

  const user = await User.findById(id).select(["name", "email", "avatar"]);

  res.send(user);
};

export const createUser = async (req, res) => {
  let user = _.pick(req.body, ["name", "email", "password"]);
  if (await User.findOne({ email: user.email })) return res.status(400).send();

  user = new User(user);

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  user.avatar = createAvatar(style, {
    dataUri: true,
    colors: ["blue", "blueGrey", "cyan", "deepOrange", "orange", "red", "teal"],
  });

  await user.save();

  const token = user.generateAuthToken();

  res.header(configs.authHeaderName, token).status(201).send();
};
