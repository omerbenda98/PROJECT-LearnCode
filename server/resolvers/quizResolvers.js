// const { Quiz } = require("../models/Quiz");
// const QuestionInputType = require("../types/QuestionInputType");
// const { QuizType, QuestionType } = require("../types/LessonType");

// const {
//   GraphQLList,
//   GraphQLNonNull,
//   GraphQLID,
//   GraphQLString,
// } = require("graphql");

// const quizResolvers = {
//   Query: {
//     quizByID: async (_, { quizId }) => {
//       try {
//         const quiz = await Quiz.findOne({ _id: quizId });

//         return quiz;
//       } catch (error) {
//         throw new Error(error.message);
//       }
//     },
//     quizzes: async () => {
//       return await Quiz.find();
//     },
//   },

//   Mutation: {
//     addQuiz: {
//       type: QuizType,
//       args: {
//         questions: { type: new GraphQLList(QuestionInputType) },
//       },
//       async resolve(parent, args) {
//         try {
//           const newQuiz = new Quiz({
//             questions: args.questions,
//             // Set other fields as needed
//           });

//           return await newQuiz.save();
//         } catch (error) {
//           throw new Error(error.message);
//         }
//       },
//     },
//   },

//   Quiz: {
//     questions: async (quiz) => {
//       const questions = await yourDataSource.getQuestionsForQuiz(quiz.id);
//       return questions.map((question) => {
//         return {
//           id: question.id,
//           text: question.text,
//           options: question.options.split(","),
//           answer: question.answer,
//         };
//       });
//     },
//   },
// };

// module.exports = quizResolvers;
