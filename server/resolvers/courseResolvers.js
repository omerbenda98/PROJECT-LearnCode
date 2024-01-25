const Course = require("../models/Course");

const {
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
} = require("graphql");
const { CourseType } = require("../types/CourseType");
const { TopicType } = require("../types/CourseType");
const LessonType = require("../types/LessonType");
const Lesson = require("../models/Lesson");
const { LessonInputType } = require("../types/inputTypes");

const courseMutations = {
  Query: {
    courses: () => {
      return Course.find();
    },
    course: (parent, args) => {
      return Course.findById(args.id);
    },
  },
  Mutation: {
    addCourse: {
      type: CourseType,
      args: {
        title: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        difficulty: { type: GraphQLString },
        topic: { type: TopicType },
        lessons: { type: new GraphQLList(GraphQLNonNull(GraphQLID)) },
      },
      resolve: async (parent, args) => {
        const course = new Course({
          title: args.title,
          description: args.description,
          difficulty: args.difficulty,
          topic: args.topic,
          lessons: args.lessons,
        });

        return course.save();
      },
    },

    updateCourse: {
      type: CourseType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        difficulty: { type: GraphQLString },
        topic: { type: TopicType },
        // lessons: { type: new GraphQLList(GraphQLNonNull(GraphQLID)) },
      },
      resolve(parent, args) {
        return Course.findByIdAndUpdate(
          args.id,
          {
            $set: {
              title: args.title,
              description: args.description,
              difficulty: args.difficulty,
              topic: args.topic,
            },
          },
          { new: true }
        );
      },
    },

    deleteCourse: {
      type: CourseType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Course.findByIdAndDelete(args.id);
      },
    },
  },
};

module.exports = courseMutations;
