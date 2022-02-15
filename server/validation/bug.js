import Joi from "joi";

export const createBugSchema = Joi.object({
  message: Joi.string().max(512).trim().required().label("Issue"),
  error: Joi.string().max(1024).trim().label("Error"),
  ip: Joi.string().min(10).max(100).trim().label("IP"),
  userAgent: Joi.string().min(10).max(200).trim().label("User Agenet"),
});
