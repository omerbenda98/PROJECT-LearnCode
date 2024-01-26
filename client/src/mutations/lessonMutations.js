import { gql } from "@apollo/client";

const ADD_LESSON = gql`
  mutation AddLesson(
    $title: String!
    $content: String
    $quiz: QuizInput!
    $isFree: Boolean!
  ) {
    addLesson(title: $title, content: $content, quiz: $quiz, isFree: $isFree) {
      id
      title
      content
      isFree
      quiz {
        questions {
          text
          options
          answer
        }
      }
    }
  }
`;

const DELETE_LESSON = gql`
  mutation DeleteLesson($id: ID!) {
    deleteLesson(id: $id) {
      id
    }
  }
`;

const UPDATE_LESSON = gql`
  mutation UpdateLesson(
    $id: ID!
    $title: String
    $content: String
    $isFree: Boolean!
    $quiz: QuizInput!
  ) {
    updateLesson(
      id: $id
      title: $title
      content: $content
      quiz: $quiz
      isFree: $isFree
    ) {
      id
      title
      content
      isFree
      quiz {
        questions {
          text
          options
          answer
        }
      }
    }
  }
`;

export { ADD_LESSON, DELETE_LESSON, UPDATE_LESSON };
