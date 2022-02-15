import Joi from "joi-browser";

export const createIssueSchema = Joi.object({
  message: Joi.string().max(512).required().label("Issue"),
  apiKey: Joi.string().required().label("App"),
});
