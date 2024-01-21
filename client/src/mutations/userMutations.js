import { gql } from "@apollo/client";
const ADD_USER = gql`
  mutation AddUser($email: String!, $password: String!, $role: Role!) {
    addUser(email: $email, password: $password, role: $role) {
      id
      email
      role
    }
  }
`;

const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

const UPDATE_USER = gql`
  mutation UpdateUser(
    $id: ID!
    $email: String
    $password: String
    $role: Role
  ) {
    updateUser(id: $id, email: $email, password: $password, role: $role) {
      id
      email
      role
    }
  }
`;

export { ADD_USER, DELETE_USER, UPDATE_USER };
