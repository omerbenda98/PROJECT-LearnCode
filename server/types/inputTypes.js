const {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
  GraphQLEnumType,
  GraphQLNonNull,
  GraphQLID,
} = require("graphql");

const QuestionInputType = new GraphQLInputObjectType({
  name: "QuestionInput",
  fields: {
    text: { type: GraphQLString },
    options: { type: new GraphQLList(GraphQLString) },
    answer: { type: GraphQLString },
  },
});

const QuizInputType = new GraphQLInputObjectType({
  name: "QuizInput",
  fields: {
    questions: { type: new GraphQLList(QuestionInputType) },
  },
});

const SectionInputTypeEnum = new GraphQLEnumType({
  name: "SectionInputType",
  values: {
    INTRODUCTION: { value: "introduction" },
    THEORY: { value: "theory" },
    EXAMPLE: { value: "example" },
    SUMMARY: { value: "summary" },
    // Add other section types as needed
  },
});

const ContentSectionInputType = new GraphQLInputObjectType({
  name: "ContentSectionInput",
  fields: {
    type: { type: SectionInputTypeEnum },
    data: { type: GraphQLString },
  },
});

const LessonInputType = new GraphQLInputObjectType({
  name: "LessonInput",
  fields: {
    title: { type: GraphQLString },
    contentSections: {
      type: new GraphQLList(new GraphQLNonNull(ContentSectionInputType)),
    },
    quiz: { type: QuizInputType },
    isFree: { type: GraphQLBoolean },
  },
});

module.exports = {
  LessonInputType,
  QuizInputType,
  QuestionInputType,
  ContentSectionInputType,
  SectionInputTypeEnum,
};
