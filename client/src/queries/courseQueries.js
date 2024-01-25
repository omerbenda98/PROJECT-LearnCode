import { gql } from "@apollo/client";

const GET_COURSES = gql`
  query getCourses {
    courses {
      id
      title
      description
      difficulty
      topic
      lessons
    }
  }
`;

const GET_COURSE = gql`
  query getCourse($id: ID!) {
    course(id: $id) {
      id
      title
      description
      difficulty
      topic
      lessons
    }
  }
`;

export { GET_COURSES, GET_COURSE };
