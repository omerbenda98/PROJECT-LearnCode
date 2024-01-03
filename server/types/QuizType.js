// const {
//   GraphQLObjectType,
//   GraphQLString,
//   GraphQLID,
//   GraphQLList,
// } = require("graphql");

// const QuizType = new GraphQLObjectType({
//   name: "Quiz",
//   fields: () => ({
//     id: { type: GraphQLID },
//     questions: { type: new GraphQLList(QuestionType) },
//   }),
// });
// const QuestionType = new GraphQLObjectType({
//   name: "Question",
//   fields: () => ({
//     id: { type: GraphQLID },
//     text: { type: GraphQLString }, // Question text
//     options: { type: new GraphQLList(GraphQLString) }, // Multiple choice options
//     answer: { type: GraphQLString }, // Correct answer
//   }),
// });

// module.exports = { QuestionType, QuizType };
