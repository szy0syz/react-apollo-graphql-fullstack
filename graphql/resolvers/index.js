/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-14 22:43:45
 * @LastEditTime: 2019-09-26 17:20:19
 * @LastEditors: Please set LastEditors
 */
const postsResolvers = require('./post');
const usersResolvers = require('./user');
const commentResolvers = require('./comment');

const shopResolvers = require('./shop');
const hshopResolvers = require('./hshop');
const floorResolvers = require('./floor');
const qiniuResolvers = require('./qiniu');

module.exports = {
  Query: {
    ...postsResolvers.Query,
    ...floorResolvers.Query,
    ...shopResolvers.Query,
    ...hshopResolvers.Query,
    ...qiniuResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentResolvers.Mutation,
    ...hshopResolvers.Mutation,
  },
  Subscription: {
    ...postsResolvers.Subscription,
  },
};
