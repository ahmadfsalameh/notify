import User from "../models/user.js";
import bcrypt from "bcrypt";
import _ from "lodash";
import validationSchema from "../validation/login.js";

export const login = async (req, res) => {
  const data = _.pick(req.body, ["email", "password"]);

  if (validationSchema.validate(data)) return res.status(400).send();

  const user = await User.findOne({ email: data.email });
  if (!user) return res.status(400).send();

  const isValid = await bcrypt.compare(data.password, user.password);
  if (!isValid) return res.status(400).send();

  const token = user.generateAuthToken();

  res.status(200).send(token);
};
