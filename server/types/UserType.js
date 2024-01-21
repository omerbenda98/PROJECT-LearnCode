const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLEnumType,
} = require("graphql");

const RoleType = new GraphQLEnumType({
  name: "Role",
  values: {
    ADMIN: { value: "ADMIN" },
    NORMAL: { value: "NORMAL" },
    SUBSCRIBED: { value: "SUBSCRIBED" },
  },
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    role: { type: RoleType },
  }),
});

module.exports = { UserType, RoleType };
