const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const User = require('../../models/User');
const { SECRET_KEY } = require('../../config');

module.exports = {
  Mutation: {
    // register(parent, args, context, info) {
    async register(
      _,
      {
        registerInput: { username, email, password, comfirmPassword },
      },
      context,
      info
    ) {
      // TODO: Validate user data
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
        password,
      });

      const res = await newUser.save();

      const token = jwt.sign(
        {
          id: res.id,
          email: res.email,
          username: res.username,
        },
        SECRET_KEY,
        { expiresIn: '1h' }
      );

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
