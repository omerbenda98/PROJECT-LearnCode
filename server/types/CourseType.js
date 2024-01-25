const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLEnumType,
} = require("graphql");
const LessonType = require("./LessonType");
const TopicType = new GraphQLEnumType({
  name: "Topic",
  values: {
    HTML: { value: "HTML" },
    CSS: { value: "CSS" },
    SQL: { value: "SQL" },
    JavaScript: { value: "JavaScript" },
    React: { value: "React" },
    NodeJS: { value: "NodeJS" },
  },
});

const CourseType = new GraphQLObjectType({
  name: "Course",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    difficulty: { type: GraphQLString },
    topic: { type: TopicType },
    lessons: { type: new GraphQLList(GraphQLID) },
  }),
});

const CourseProgressType = new GraphQLObjectType({
  name: "CourseProgress",
  fields: () => ({
    courseId: { type: GraphQLID },
    completedLessons: { type: new GraphQLList(GraphQLID) },
  }),
});
module.exports = { CourseType, CourseProgressType, TopicType };
