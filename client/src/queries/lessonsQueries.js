import { gql } from "@apollo/client";

const GET_LESSONS = gql`
  query getLessons {
    lessons {
      id
      title
      content
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

const GET_LESSON = gql`
  query getLesson($id: ID!) {
    lesson(id: $id) {
      id
      title
      content
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

const GET_LESSONS_BY_COURSE = gql`
  query GetLessonsByCourse($courseId: ID!) {
    lessonsByCourse(courseId: $courseId) {
      id
      title
      content
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
export { GET_LESSONS, GET_LESSON, GET_LESSONS_BY_COURSE };
