/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-15 21:18:37
 * @LastEditTime: 2019-09-15 21:44:03
 * @LastEditors: Please set LastEditors
 */
const { AuthenticationError } = require('apollo-server');

const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

/**
 * @description: token验证中间件
 * @param {context}
 * @return:
 */
module.exports = context => {
  // context = { ... headers ... }
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    // Bearer
    const token = authHeader.split('Bearer ')[1];
    if (token) {
      try {
        const user = jwt.verify(token, SECRET_KEY);
        return user;
      } catch (error) {
        throw new AuthenticationError('Invalid/Expired token');
      }
    }
    throw new Error("Authentication token must be 'Bearer [token]' ");
  }
  throw new Error('Authentication header must be provided');
};
