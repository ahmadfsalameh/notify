import Joi from "joi-browser";

export const createAppSchema = Joi.object({
  name: Joi.string().max(100).required(),
});
