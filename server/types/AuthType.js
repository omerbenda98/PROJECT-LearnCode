const { GraphQLObjectType, GraphQLString } = require("graphql");
const { RoleType } = require("./UserType");

const AuthDataType = new GraphQLObjectType({
  name: "AuthData",
  fields: () => ({
    userId: { type: GraphQLString },
    token: { type: GraphQLString },
    role: { type: RoleType },
    tokenExpiration: { type: GraphQLString },
  }),
});

module.exports = { AuthDataType };
