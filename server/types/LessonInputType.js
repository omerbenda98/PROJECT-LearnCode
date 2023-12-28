const { GraphQLInputObjectType, GraphQLString, GraphQLID } = require("graphql");

const LessonInputType = new GraphQLInputObjectType({
  name: "LessonInput",
  fields: {
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    // quizId: { type: GraphQLID }, // Include if you need to associate a quiz by ID
    // You can include other necessary fields here
  },
});

module.exports = LessonInputType;
