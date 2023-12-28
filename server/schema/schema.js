const { GraphQLSchema } = require("graphql");
const RootQueryType = require("../RootQuery");
const MutationType = require("../Mutation");

module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation: MutationType,
});
