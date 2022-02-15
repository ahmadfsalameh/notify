import Joi from "joi";

export const createTeamSchema = Joi.object({
  name: Joi.string().required().max(100).label("Team name"),
});
