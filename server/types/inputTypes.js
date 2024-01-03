const {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
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
    // Add other quiz fields if needed
  },
});

const LessonInputType = new GraphQLInputObjectType({
  name: "LessonInput",
  fields: {
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    quiz: { type: QuizInputType },
    // You can include other necessary fields here
  },
});

module.exports = { LessonInputType, QuizInputType, QuestionInputType };
