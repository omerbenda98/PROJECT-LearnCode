const User = require("../models/User");
const { UserType, RoleType } = require("../types/UserType");
const { GraphQLString, GraphQLEnumType } = require("graphql");
const bcrypt = require("bcrypt");

const userResolvers = {
  Query: {
    users: () => {
      // Return all lessons
      return User.find();
    },
    user: (parent, { id }) => {
      // Return a single lesson by ID
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
          const hashedPassword = await bcrypt.hash(args.password, 10); // 10 is the salt rounds
          // Create a new lesson
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
    // Other mutations like updateLesson, deleteLesson, etc.
  },
};

module.exports = userResolvers;
