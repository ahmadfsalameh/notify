import Joi from "joi";

export const sendInviteSchema = Joi.object({
  email: Joi.string().email().required().label("Email"),
});

export const getInviteSchema = Joi.object({
  link: Joi.string().max(20).required().label("Invite Link"),
});
