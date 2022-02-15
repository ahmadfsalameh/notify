import Joi from "joi-browser";

export const createTeamSchema = Joi.object({
  name: Joi.string().max(100).required().label("Team Name"),
  appId: Joi.string().required().label("App"),
});

export const inviteMemberSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainAtoms: 2,
    })
    .required()
    .label("Member email"),
});
