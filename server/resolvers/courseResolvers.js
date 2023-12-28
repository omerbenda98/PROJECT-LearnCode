const Course = require("../models/Course"); // Mongoose model

const {
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
} = require("graphql");
const { CourseType } = require("../types/CourseType");
const LessonType = require("../types/LessonType");
const Lesson = require("../models/Lesson");
const LessonInputType = require("../types/LessonInputType");

const courseMutations = {
  Query: {
    courses: () => {
      console.log("here");
      return Course.find();
      // logic to return courses
    },
    course: (parent, args) => {
      return Course.findById(args.id);
      // logic to return a single course
    },
  },
  Mutation: {
    addCourse: {
      type: CourseType,
      args: {
        title: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        difficulty: { type: GraphQLString },
        topics: { type: new GraphQLList(GraphQLString) },
        lessons: { type: new GraphQLList(LessonInputType) },
      },
      resolve: async (parent, args) => {
        // Create lesson documents from the input
        const lessonDocuments = args.lessons.map(
          (lesson) => new Lesson(lesson)
        );
        // Save all lessons and collect their IDs
        await Promise.all(lessonDocuments.map((lesson) => lesson.save()));

        const course = new Course({
          title: args.title,
          description: args.description,
          difficulty: args.difficulty,
          topics: args.topics,
          lessons: lessonDocuments, // Store only lesson IDs in the course document
        });

        return course.save();
      },
    },
    // Update a course
    updateCourse: {
      type: CourseType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        difficulty: { type: GraphQLString },
        topics: { type: new GraphQLList(GraphQLString) },
      },
      resolve(parent, args) {
        return Course.findByIdAndUpdate(
          args.id,
          {
            $set: {
              title: args.title,
              description: args.description,
              difficulty: args.difficulty,
              topics: args.topics,
            },
          },
          { new: true }
        );
      },
    },
    // Delete a course
    deleteCourse: {
      type: CourseType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Course.findByIdAndDelete(args.id);
      },
    },
    // Add a lesson
    addLesson: {
      type: LessonType,
      args: {
        // Add necessary arguments
      },
      resolve(parent, args) {
        // Implementation for adding a lesson
      },
    },
  },
};

module.exports = courseMutations;
