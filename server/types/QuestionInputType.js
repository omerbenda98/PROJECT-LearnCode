const {
  GraphQLList,

  GraphQLString,
  GraphQLInputObjectType,
} = require("graphql");

const QuestionInputType = new GraphQLInputObjectType({
  name: "QuestionInput",
  fields: () => ({
    text: { type: GraphQLString },
    options: { type: new GraphQLList(GraphQLString) },
    answer: { type: GraphQLString },
  }),
});

module.exports = QuestionInputType;
