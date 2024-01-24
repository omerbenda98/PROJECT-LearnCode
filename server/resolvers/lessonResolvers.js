const User = require("../models/User"); // Replace with your User model path
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { GraphQLString, GraphQLObjectType } = require("graphql");
const AuthDataType = require("../types/AuthType"); // Assuming this is your AuthDataType

const authResolvers = {
  Query: {
    // If you have any auth-related queries, define them here
  },
  Mutation: {
    login: {
      type: AuthDataType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve: async (parent, { email, password }) => {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("User does not exist!");
        }

        // Compare passwords
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
          throw new Error("Password is incorrect!");
        }

        // Generate JWT
        const token = jwt.sign(
          { userId: user.id, email: user.email },
          process.env.JWT_SECRET, // Use the secret from your environment variable
          { expiresIn: "1h" }
        );

        return { userId: user.id, token: token, tokenExpiration: 1 };
      },
    },
    // You can add other mutations like register, changePassword, etc.
  },
};

module.exports = authResolvers;
