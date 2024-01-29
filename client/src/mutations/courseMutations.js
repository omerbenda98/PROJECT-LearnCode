import { gql } from "@apollo/client";

const ADD_COURSE = gql`
  mutation AddCourse(
    $title: String!
    $description: String
    $difficulty: String
    $topic: Topic!
    $lessons: [ID!]
  ) {
    addCourse(
      title: $title
      description: $description
      difficulty: $difficulty
      topic: $topic
      lessons: $lessons
    ) {
      id
      title
      description
      difficulty
      topic
      lessons
    }
  }
`;

const UPDATE_COURSE = gql`
  mutation UpdateCourse(
    $id: ID!
    $title: String
    $description: String
    $difficulty: String
    $topic: Topic!
  ) {
    updateCourse(
      id: $id
      title: $title
      description: $description
      difficulty: $difficulty
      topic: $topic
    ) {
      id
      title
      description
      difficulty
      topic
      lessons
    }
  }
`;

const DELETE_COURSE = gql`
  mutation DeleteCourse($id: ID!) {
    deleteCourse(id: $id) {
      id
    }
  }
`;

export { DELETE_COURSE, UPDATE_COURSE, ADD_COURSE };
