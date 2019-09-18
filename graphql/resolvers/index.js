/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-14 22:43:45
 * @LastEditTime: 2019-09-18 14:46:35
 * @LastEditors: Please set LastEditors
 */
const postsResolvers = require('./post');
const usersResolvers = require('./user');
const commentResolvers = require('./comment');

const floorResolvers = require('./floor');

module.exports = {
  Query: {
    ...postsResolvers.Query,
    ...floorResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentResolvers.Mutation,
  },
  Subscription: {
    ...postsResolvers.Subscription,
  },
};
