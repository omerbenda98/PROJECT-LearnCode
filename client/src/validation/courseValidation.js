import Joi from "joi-browser";

const courseSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(""), // Allowing empty string for optional field
  difficulty: Joi.string().allow(""), // Allowing empty string for optional field
  topic: Joi.string()
    .valid("HTML", "CSS", "JavaScript", "SQL", "React", "NodeJS")
    .default("HTML"),
  lessons: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)), // Validating as MongoDB ObjectID
});

const validateCourseSchema = (courseInput) => {
  return Joi.validate(courseInput, courseSchema, { abortEarly: false });
};

export default validateCourseSchema;
