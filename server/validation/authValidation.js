const Joi = require("joi");

// Define the registration validation schema
const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(20).required(),
  role: Joi.string().valid("NORMAL", "SUBSCRIBED").required(),
});

// Define the login validation schema
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Middleware for register validation
const validateRegister = (data) => {
  const { error } = registerSchema.validate(data);
  return error ? error.details[0].message : null;
};
// Middleware for login validation
const validateLogin = (data) => {
  const { error } = loginSchema.validate(data);
  return error ? error.details[0].message : null;
};

module.exports = {
  validateRegister,
  validateLogin,
};
