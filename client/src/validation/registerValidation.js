import Joi from "joi-browser";

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(20).required(),
  role: Joi.boolean(),
});

const validateRegisterSchema = (userInput) => {
  return Joi.validate(userInput, registerSchema, { abortEarly: false });
};
export default validateRegisterSchema;
