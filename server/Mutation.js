const courseMutations = require("./resolvers/courseResolvers");
const { GraphQLObjectType } = require("graphql");

const MutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...courseMutations.Mutation,
  },
});

module.exports = MutationType;
