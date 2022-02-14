import User from "../models/user.js";
import bcrypt from "bcrypt";
import _ from "lodash";

export const login = async (req, res) => {
  const data = _.pick(req.body, ["email", "password"]);

  const user = await User.findOne({ email: data.email });
  if (!user) return res.status(400).send();

  const isValid = await bcrypt.compare(data.password, user.password);
  if (!isValid) return res.status(400).send();

  const token = user.generateAuthToken();

  res.status(200).send(token);
};
