const User = require("../models/User");
const { UserType, RoleType } = require("../types/UserType");
const { GraphQLString, GraphQLEnumType } = require("graphql");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const secret = crypto.randomBytes(32).toString("hex");
require("dotenv").config();

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
  // login: {
  //   type: AuthDataType,
  //   args: {
  //     email: { type: GraphQLString },
  //     password: { type: GraphQLString },
  //   },
  //   resolve: async (parent, { email, password }) => {
  //     const user = await User.findOne({ email });
  //     if (!user) {
  //       throw new Error("User does not exist!");
  //     }

  //     const isEqual = await bcrypt.compare(password, user.password);
  //     if (!isEqual) {
  //       throw new Error("Password is incorrect!");
  //     }

  //     const token = jwt.sign(
  //       { userId: user.id, email: user.email },
  //       jwtSecret, // Replace with a real secret key
  //       { expiresIn: "1h" }
  //     );

  //     return { userId: user.id, token: token, tokenExpiration: 1 };
  //   },
  // },
};

module.exports = userResolvers;
