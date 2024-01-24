const courseMutations = require("./resolvers/courseResolvers");
const lessonResolvers = require("./resolvers/lessonResolvers");
const userResolvers = require("./resolvers/userResolvers");
const authResolvers = require("./resolvers/authResolvers");
const { GraphQLObjectType } = require("graphql");

const MutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...courseMutations.Mutation,
    ...lessonResolvers.Mutation,
    ...userResolvers.Mutation,
    ...authResolvers.Mutation,
  },
});

module.exports = MutationType;
