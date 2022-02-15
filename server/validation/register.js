import Joi from "joi";

const validationSchema = Joi.object({
  name: Joi.string().required().max(100).label("Name"),
  email: Joi.string().email().required().label("Email"),
  password: Joi.string().min(8).max(100).required().label("Password"),
});

export default validationSchema;
