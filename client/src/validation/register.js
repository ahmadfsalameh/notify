import Joi from "joi-browser";

const validationSchema = Joi.object({
  name: Joi.string().min(5).max(100),
  email: Joi.string()
    .email({
      minDomainAtoms: 2,
    })
    .required()
    .label("Email"),
  password: Joi.string().min(8).max(100).required().label("Password"),
});

export default validationSchema;
