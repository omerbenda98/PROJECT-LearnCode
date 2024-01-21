import { gql } from "@apollo/client";

const ADD_COURSE = gql`
  mutation AddCourse(
    $title: String!
    $description: String
    $difficulty: String
    $topics: [String]
    $lessons: [ID!]
  ) {
    addCourse(
      title: $title
      description: $description
      difficulty: $difficulty
      topics: $topics
      lessons: $lessons
    ) {
      id
      title
      description
      difficulty
      topics
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
    $topics: [String]
  ) {
    updateCourse(
      id: $id
      title: $title
      description: $description
      difficulty: $difficulty
      topics: $topics
    ) {
      id
      title
      description
      difficulty
      topics
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
