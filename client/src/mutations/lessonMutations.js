import { gql } from "@apollo/client";

const ADD_LESSON = gql`
mutation AddLesson($title: String!, $content: String, $courseId: ID!, $quizId: ID) {
  addLesson(title: $title, content: $content, courseId: $courseId, quizId: $quizId) {
    id
    title
    content
    quiz {
      id
      // Include other quiz fields as needed
    }
    // Include other lesson fields as needed
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
mutation UpdateLesson($id: ID!, $title: String, $content: String, $quizId: ID) {
  updateLesson(id: $id, title: $title, content: $content, quizId: $quizId) {
    id
    title
    content
    quiz {
      id
      // Include other quiz fields as needed
    }
    // Include other lesson fields as needed
  }
}

`;

export { ADD_LESSON, DELETE_LESSON, UPDATE_LESSON };
