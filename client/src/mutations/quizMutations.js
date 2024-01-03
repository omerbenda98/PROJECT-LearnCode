import { gql } from "@apollo/client";

const ADD_QUIZ = gql`
  mutation AddQuiz($questions: [QuestionInput!]!) {
    addQuiz(questions: $questions) {
      id
      questions {
        id
        text
        options
        answer
      }
    }
  }
`;

const DELETE_QUIZ = gql`
  mutation DeleteQuiz($id: ID!) {
    deleteQuiz(id: $id) {
      id
    }
  }
`;

export { ADD_QUIZ, DELETE_QUIZ };
