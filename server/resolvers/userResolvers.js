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
  },
};

module.exports = userResolvers;
