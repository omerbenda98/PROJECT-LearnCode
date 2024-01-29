import Joi from "joi-browser";

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(20).required(),
});

const validateLoginSchema = (userInput) => {
  return Joi.validate(userInput, loginSchema, { abortEarly: false });
};
export default validateLoginSchema;
