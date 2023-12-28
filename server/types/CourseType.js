const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} = require("graphql");
const LessonType = require("./LessonType");

const CourseType = new GraphQLObjectType({
  name: "Course",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    difficulty: { type: GraphQLString }, // e.g., 'Beginner', 'Intermediate', 'Advanced'
    topics: { type: new GraphQLList(GraphQLString) }, // List of topics covered
    lessons: { type: new GraphQLList(LessonType) }, // Linked to LessonType
  }),
});

const CourseProgressType = new GraphQLObjectType({
  name: "CourseProgress",
  fields: () => ({
    courseId: { type: GraphQLID },
    completedLessons: { type: new GraphQLList(GraphQLID) }, // IDs of completed lessons
  }),
});
module.exports = { CourseType, CourseProgressType };
