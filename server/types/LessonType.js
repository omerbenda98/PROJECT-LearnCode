const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLEnumType,
  GraphQLBoolean,
  GraphQLNonNull,
} = require("graphql");

const QuestionType = new GraphQLObjectType({
  name: "Question",
  fields: () => ({
    text: { type: GraphQLString },
    options: { type: new GraphQLList(GraphQLString) },
    answer: { type: GraphQLString },
  }),
});

const QuizType = new GraphQLObjectType({
  name: "Quiz",
  fields: () => ({
    questions: { type: new GraphQLList(QuestionType) },
  }),
});
const SectionTypeEnum = new GraphQLEnumType({
  name: "SectionType",
  values: {
    INTRODUCTION: { value: "introduction" },
    THEORY: { value: "theory" },
    EXAMPLE: { value: "example" },
    SUMMARY: { value: "summary" },
    // Add other section types as needed
  },
});

const ContentSectionType = new GraphQLObjectType({
  name: "ContentSection",
  fields: () => ({
    type: { type: SectionTypeEnum }, // Using enum here
    data: { type: GraphQLString },
  }),
});

const LessonType = new GraphQLObjectType({
  name: "Lesson",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    contentSections: {
      type: new GraphQLList(new GraphQLNonNull(ContentSectionType)),
    },
    quiz: { type: QuizType },
    isFree: { type: GraphQLBoolean },
  }),
});
module.exports = LessonType;
