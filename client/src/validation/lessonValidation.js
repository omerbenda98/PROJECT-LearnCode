import Joi from "joi-browser";

const contentSectionSchema = Joi.object({
  type: Joi.string()
    .valid("introduction", "theory", "example", "summary")
    .required(),
  data: Joi.string().required(),
});

const questionSchema = Joi.object({
  text: Joi.string().required(),
  options: Joi.array().items(Joi.string()).required(),
  answer: Joi.string().required(),
});

const lessonSchema = Joi.object({
  title: Joi.string().required(),
  contentSections: Joi.array().items(contentSectionSchema),
  quiz: Joi.object({
    questions: Joi.array().items(questionSchema),
  }),
  isFree: Joi.boolean().required(),
});

const validateLessonSchema = (lessonInput) => {
  return Joi.validate(lessonInput, lessonSchema, { abortEarly: false });
};

export default validateLessonSchema;
