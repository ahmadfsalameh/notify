import Joi from "joi";

export const createAppSchema = Joi.object({
  name: Joi.string().required().max(100).label("App name"),
});

export const apiKeySchema = Joi.object({
  name: Joi.string().required().max(200).label("Api key"),
});
