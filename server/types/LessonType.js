const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");

const QuestionType = new GraphQLObjectType({
  name: "Question",
  fields: () => ({
    text: { type: GraphQLString },
    options: { type: new GraphQLList(GraphQLString) },
    answer: { type: GraphQLString },
  }),
});

const QuizType = new GraphQLObjectType({
  name: "Quiz",
  fields: () => ({
    questions: { type: new GraphQLList(QuestionType) },
  }),
});

const LessonType = new GraphQLObjectType({
  name: "Lesson",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    quiz: { type: QuizType },
  }),
});

module.exports = LessonType;
