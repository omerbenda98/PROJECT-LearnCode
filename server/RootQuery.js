const {
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
} = require("graphql");
const { CourseType } = require("./types/CourseType");
const LessonType = require("./types/LessonType");
const UserType = require("./types/UserType");
const { QuizType } = require("./types/QuizType");
const courseMutations = require("./resolvers/courseResolvers");
const lessonResolvers = require("./resolvers/lessonResolvers");

// import Course from "./models/Course";

const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    courses: {
      type: new GraphQLList(CourseType),
      resolve: courseMutations.Query.courses,
    },
    course: {
      type: CourseType,
      args: { id: { type: GraphQLNonNull(GraphQLID) } },
      resolve: courseMutations.Query.course,
    },
    lessons: {
      type: new GraphQLList(LessonType),
      resolve: lessonResolvers.Query.lessons,
    },
    lesson: {
      type: LessonType,
      args: { id: { type: GraphQLNonNull(GraphQLID) } },
      resolve: lessonResolvers.Query.lesson,
    },
    lessonsByCourse: {
      type: new GraphQLList(LessonType),
      args: { courseId: { type: GraphQLNonNull(GraphQLID) } },
      resolve: lessonResolvers.Query.lessonsByCourse,
    },
    user: {
      type: UserType,
    },
    // Additional fields as needed...
  },
});

module.exports = RootQueryType;
