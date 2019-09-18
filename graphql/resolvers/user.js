const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');
const {
  validateRegisterInput,
  validateLoginInput,
} = require('../../utils/validatrors');
const User = require('../../models/User');
const { SECRET_KEY } = require('../../config');

function GenerateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    SECRET_KEY,
    { expiresIn: '1h' },
  );
}

module.exports = {
  Mutation: {
    // register(parent, args, context, info) {
    async register(
      _,
      {
        registerInput: { username, email, password, confirmPassword },
      },
      context,
      info,
    ) {
      // TODO: Validate user data
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword,
      );
      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }
      // TODO: Make sure user doesnt already exist
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError('Username is token', {
          errors: {
            username: 'The username is token',
          },
        });
      }
      // TODO: hash password and create an auth token

      const newUser = new User({
        email,
        username,
        password: bcrypt.hashSync(password),
      });
      
      const res = await newUser.save();
      const token = GenerateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },


    /**
     * @description: 用户注册
     * @param (parent, args, context, info)
     * @return: {...user, token}
     */    
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);

      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }
      
      const user = await User.findOne({ username });

      if (!user) {
        errors.general = 'User not found';
        throw new UserInputError('User not found', { errors });
      }

      const match = await bcrypt.compare(password, user.password);
      
      if (!match) {
        errors.general = 'User not found';
        throw new UserInputError('User not found', { errors });
      }

      const token = GenerateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
  },
};
