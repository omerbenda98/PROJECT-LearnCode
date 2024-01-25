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
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      userId
      token
      tokenExpiration
      role
    }
  }
`;

export { REGISTER, LOGIN };
