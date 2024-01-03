const courseMutations = require("./resolvers/courseResolvers");
const lessonResolvers = require("./resolvers/lessonResolvers");
const quizResolvers = require("./resolvers/quizResolvers");
const { GraphQLObjectType } = require("graphql");

const MutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...courseMutations.Mutation,
    ...lessonResolvers.Mutation,
    // ...quizResolvers.Mutation,
  },
});

module.exports = MutationType;
