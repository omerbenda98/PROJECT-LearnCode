const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} = require("graphql");
const { CourseProgressType } = require("./CourseType");

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    progress: { type: new GraphQLList(CourseProgressType) }, // User's progress in courses
  }),
});

module.exports = UserType;
