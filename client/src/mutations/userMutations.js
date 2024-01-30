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
  mutation UpdateUser($id: ID!, $role: Role) {
    updateUser(id: $id, role: $role) {
      id
      role
    }
  }
`;

const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshToken($token: String!) {
    refreshToken(token: $token)
  }
`;

export { ADD_USER, DELETE_USER, UPDATE_USER, REFRESH_TOKEN_MUTATION };
