const { GraphQLString } = require("graphql");
const { AuthDataType } = require("../types/AuthType");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { RoleType } = require("../types/UserType");
const {
  validateRegister,
  validateLogin,
} = require("../validation/authValidation");

async function loginUser(email, password) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User does not exist!");
  }

  const isEqual = await bcrypt.compare(password, user.password);
  if (!isEqual) {
    throw new Error("Password is incorrect!");
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return { userId: user.id, token: token, tokenExpiration: 1 };
}

const authResolvers = {
  Mutation: {
    login: {
      type: AuthDataType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve: async (parent, { email, password, role }) => {
        console.log({ email, password });
        const validationError = validateLogin({ email, password }); // Assuming validateLogin now returns error instead of sending response
        if (validationError) {
          throw new Error(validationError);
        }
        return loginUser(email, password, role);
      },
    },
    register: {
      type: AuthDataType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        role: { type: RoleType },
      },
      async resolve(parent, args) {
        try {
          const validationError = validateRegister(args); // Assuming validateLogin now returns error instead of sending response
          if (validationError) {
            throw new Error(validationError);
          }
          const existingUser = await User.findOne({ email: args.email });
          if (existingUser) {
            throw new Error("Email already exists");
          }
          const hashedPassword = await bcrypt.hash(args.password, 10);

          const newUser = new User({
            email: args.email,
            password: hashedPassword,
            role: args.role,
          });
          await newUser.save();

          return loginUser(args.email, args.password);
        } catch (error) {
          throw new Error(error.message);
        }
      },
    },
  },
};

module.exports = authResolvers;
