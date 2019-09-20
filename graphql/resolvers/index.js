/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-14 22:43:45
 * @LastEditTime: 2019-09-20 16:20:43
 * @LastEditors: Please set LastEditors
 */
const postsResolvers = require('./post');
const usersResolvers = require('./user');
const commentResolvers = require('./comment');

const shopResolvers = require('./shop');
const floorResolvers = require('./floor');

module.exports = {
  Query: {
    ...postsResolvers.Query,
    ...floorResolvers.Query,
    ...shopResolvers.Query,
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
