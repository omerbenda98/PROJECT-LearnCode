const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} = require("graphql");
const { QuizType } = require("./QuizType");

const LessonType = new GraphQLObjectType({
  name: "Lesson",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString }, // Instructional content
    quiz: { type: QuizType }, // Associated quiz
  }),
});
module.exports = LessonType;
