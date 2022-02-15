import Joi from "joi-browser";

const validationSchema = Joi.object({
  name: Joi.string().max(100).required().label("New Name"),
});

export default validationSchema;
