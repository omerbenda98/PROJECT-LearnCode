const Lesson = require("../models/Lesson");
const Course = require("../models/Course");

const {
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLObjectType,
} = require("graphql");
const LessonType = require("../types/LessonType");
const { QuizInputType } = require("../types/inputTypes");

const lessonResolvers = {
  Query: {
    lessons: () => {
      // Return all lessons
      return Lesson.find();
    },
    lesson: (parent, { id }) => {
      // Return a single lesson by ID
      return Lesson.findById(id);
    },
    lessonsByCourse: async (parent, { courseId }) => {
      return Course.findById(courseId)
        .populate("lessons") // Make sure this field name matches your Course model
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
        // Create a new lesson
        const newLesson = new Lesson({
          title: args.title,
          content: args.content,
          quiz: args.quiz,
        });
        const savedLesson = await newLesson.save();

        return savedLesson;
      },
    },
    // Other mutations like updateLesson, deleteLesson, etc.
  },
};

module.exports = lessonResolvers;
