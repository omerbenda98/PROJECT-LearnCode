const { GraphQLObjectType, GraphQLString } = require("graphql");

const AuthDataType = new GraphQLObjectType({
  name: "AuthData",
  fields: () => ({
    userId: { type: GraphQLString },
    token: { type: GraphQLString },
    tokenExpiration: { type: GraphQLString },
  }),
});

module.exports = { AuthDataType };
