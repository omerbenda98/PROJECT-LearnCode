import { gql } from "@apollo/client";

const GET_USERS = gql`
  query getUsers {
    users {
      id
      email
      role
    }
  }
`;

const GET_USER = gql`
  query getUser($id: ID!) {
    lesson(id: $id) {
      id
      email
      role
    }
  }
`;

export { GET_USERS, GET_USER };
