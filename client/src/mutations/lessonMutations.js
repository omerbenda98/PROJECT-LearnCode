import { gql } from "@apollo/client";

const ADD_LESSON = gql`
  mutation AddLesson(
    $title: String!
    $contentSections: [ContentSectionInput!]!
    $quiz: QuizInput!
    $isFree: Boolean!
  ) {
    addLesson(
      title: $title
      contentSections: $contentSections
      quiz: $quiz
      isFree: $isFree
    ) {
      id
      title
      contentSections {
        type
        data
      }
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
    $contentSections: [ContentSectionInput!]!
    $quiz: QuizInput!
    $isFree: Boolean!
  ) {
    updateLesson(
      id: $id
      title: $title
      contentSections: $contentSections
      quiz: $quiz
      isFree: $isFree
    ) {
      id
      title
      contentSections {
        type
        data
      }
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
