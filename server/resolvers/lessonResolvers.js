const Lesson = require("../models/Lesson");
const Course = require("../models/Course");

const {
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLObjectType,
} = require("graphql");
const { LessonType } = require("../types/LessonType"); // Assuming you have a LessonType defined

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
    lessonsByCourse: (parent, { courseId }) => {
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
        courseId: { type: GraphQLNonNull(GraphQLID) }, // The ID of the course to add the lesson to
        // Include other fields as needed
      },
      async resolve(parent, args) {
        // Create a new lesson
        const newLesson = new Lesson({
          title: args.title,
          content: args.content,
          // Set other fields as needed
        });
        const savedLesson = await newLesson.save();

        // Add the lesson to the course
        await Course.findByIdAndUpdate(args.courseId, {
          $push: { lessons: savedLesson._id },
        });

        return savedLesson;
      },
    },
    // Other mutations like updateLesson, deleteLesson, etc.
  },
};

module.exports = lessonResolvers;
