import Joi from "joi-browser";

const validationSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainAtoms: 2,
    })
    .required()
    .label("Email"),
  password: Joi.string().min(8).max(100).required().label("Password"),
});

export default validationSchema;
