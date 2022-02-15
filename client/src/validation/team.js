import Joi from "joi-browser";

export const createTeamSchema = Joi.object({
  name: Joi.string().max(100).required().label("Team Name"),
  appId: Joi.string().required().label("App"),
});
