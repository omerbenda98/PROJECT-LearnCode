const {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
} = require("graphql");

const QuestionInputType = new GraphQLInputObjectType({
  name: "QuestionInput",
  fields: {
    text: { type: GraphQLString },
    options: { type: new GraphQLList(GraphQLString) },
    answer: { type: GraphQLString },
  },
});

const QuizInputType = new GraphQLInputObjectType({
  name: "QuizInput",
  fields: {
    questions: { type: new GraphQLList(QuestionInputType) },
  },
});

const LessonInputType = new GraphQLInputObjectType({
  name: "LessonInput",
  fields: {
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    quiz: { type: QuizInputType },
    isFree: { type: GraphQLBoolean },
  },
});

module.exports = { LessonInputType, QuizInputType, QuestionInputType };
