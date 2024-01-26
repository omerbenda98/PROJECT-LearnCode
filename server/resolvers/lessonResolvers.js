const { GraphQLNonNull, GraphQLString, GraphQLBoolean } = require("graphql");

const LessonType = require("../types/LessonType");
const { QuizInputType } = require("../types/inputTypes");
const Course = require("../models/Course");
const Lesson = require("../models/Lesson");

const lessonResolvers = {
  Query: {
    lessons: () => {
      return Lesson.find();
    },
    lesson: (parent, { id }) => {
      return Lesson.findById(id);
    },
    lessonsByCourse: async (parent, { courseId }) => {
      return Course.findById(courseId)
        .populate("lessons")
        .then((course) => (course ? course.lessons : []))
        .catch((err) => {
          console.error(err);
          throw new Error("Error fetching lessons for course");
        });
    },
  },
  Mutation: {
    addLesson: {
      type: LessonType,
      args: {
        title: { type: GraphQLNonNull(GraphQLString) },
        content: { type: GraphQLString },
        quiz: { type: QuizInputType },
        isFree: { type: GraphQLBoolean },
      },
      async resolve(parent, args) {
        try {
          console.log(args);
          const newLesson = new Lesson({
            title: args.title,
            content: args.content,
            quiz: args.quiz,
            isFree: args.isFree,
          });
          const savedLesson = await newLesson.save();
          return savedLesson;
        } catch (error) {
          console.error("Error in addLesson resolver:", error);
          throw new Error("Error adding lesson");
        }
      },
    },
  },
};

module.exports = lessonResolvers;
