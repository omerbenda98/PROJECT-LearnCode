const User = require("../models/User");
const { UserType, RoleType } = require("../types/UserType");
const { GraphQLString, GraphQLEnumType, GraphQLID } = require("graphql");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const secret = crypto.randomBytes(32).toString("hex");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const userResolvers = {
  Query: {
    users: () => {
      return User.find();
    },
    user: (parent, { id }) => {
      return User.findById(id);
    },
  },
  Mutation: {
    addUser: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        role: { type: RoleType },
      },
      async resolve(parent, args) {
        try {
          const hashedPassword = await bcrypt.hash(args.password, 10);

          const newUser = new User({
            email: args.email,
            password: hashedPassword,
            role: args.role,
          });
          const savedUser = await newUser.save();

          return savedUser;
        } catch (error) {
          throw new Error(error.message);
        }
      },
    },
    updateUser: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
        role: { type: RoleType },
      },
      async resolve(parent, args) {
        try {
          // Find the user and update the role
          const updatedUser = await User.findByIdAndUpdate(
            args.id,
            { $set: { role: args.role } },
            { new: true } // Return the updated document
          );

          return updatedUser;
        } catch (error) {
          throw new Error(error.message);
        }
      },
    },
    refreshToken: {
      type: GraphQLString, // This mutation will return a String (new JWT token)
      args: {
        token: { type: GraphQLString }, // Accept the current token
      },
      async resolve(parent, args) {
        try {
          // Verify the current token
          const decoded = jwt.verify(args.token, process.env.JWT_SECRET);

          // Fetch the latest user information
          const user = await User.findById(decoded.userId);
          if (!user) {
            throw new Error("User not found");
          }

          // Issue a new token with updated information
          const newToken = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" } // Set the expiration as needed
          );

          return newToken;
        } catch (error) {
          throw new Error("Invalid token");
        }
      },
    },
  },
};

module.exports = userResolvers;
