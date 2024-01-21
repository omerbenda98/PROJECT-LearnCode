const courseMutations = require("./resolvers/courseResolvers");
const lessonResolvers = require("./resolvers/lessonResolvers");
const userResolvers = require("./resolvers/userResolvers");
const { GraphQLObjectType } = require("graphql");

const MutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...courseMutations.Mutation,
    ...lessonResolvers.Mutation,
    ...userResolvers.Mutation,
  },
});

module.exports = MutationType;
