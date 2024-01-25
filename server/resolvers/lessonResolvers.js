const {
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLObjectType,
} = require("graphql");

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
      },
      async resolve(parent, args) {
        try {
          const newLesson = new Lesson({
            title: args.title,
            content: args.content,
            quiz: args.quiz,
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
