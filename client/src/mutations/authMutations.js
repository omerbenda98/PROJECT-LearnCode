import { gql } from "@apollo/client";
const REGISTER = gql`
  mutation register($email: String!, $password: String!, $role: Role!) {
    register(email: $email, password: $password, role: $role) {
      userId
      token
      tokenExpiration
      role
    }
  }
`;

const LOGIN = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

export { REGISTER, LOGIN };
