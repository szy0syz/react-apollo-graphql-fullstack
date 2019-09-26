/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-14 22:43:45
 * @LastEditTime: 2019-09-26 16:59:44
 * @LastEditors: Please set LastEditors
 */
const { ApolloServer, PubSub } = require('apollo-server');

const mongoose = require('mongoose');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const bcrypt = require('bcryptjs');

const Post = require('./models/Post');
const User = require('./models/User');
const Shop = require('./models/Shop');

const { ShopList } = require('./graphql/resolvers/shop.json');

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

mongoose.connect('mongodb://localhost:27017/apollo_serv', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once('open', async () => {
  console.info('[Info] MongoDB is running');
  let users = await User.find({});

  // init database
  if (users.length === 0) {
    console.log('[init database]');
    const _password = bcrypt.hashSync('123123');
    users = await User.insertMany([
      {
        username: 'jerry',
        password: _password,
        email: 'jerry@123.com',
      },
      {
        username: 'szy0syz',
        password: _password,
        email: 'szy0syz@123.com',
      },
      {
        username: 'jerry1',
        password: _password,
        email: 'jerry1@123.com',
      },
    ]);

    let posts = await Post.find({});
    if (posts.length === 0) {
      Post.insertMany([
        {
          username: 'jerry',
          body: 'hahahaha',
          user: users[0]._id,
        },
        {
          username: 'jerry',
          body: 'hi~~~~',
          user: users[0]._id,
        },
        {
          username: 'szy0syz',
          body: 'wahaha',
          user: users[1]._id,
        },
      ]);
    }
  }

  // init shops
  let shopCount = await Shop.countDocuments();
  if (shopCount === 0) {
    const shopList = ShopList.map(shop => ({
      floor: shop.floor,
      name: shop.name,
      commercialTypeID: shop.commercialTypeID,
      commercialTypeName: shop.commercialTypeName,
      subCommercialTypeName: shop.subCommercialTypeName,
      floorName: shop.floorName,
      doorNo: shop.doorNo,
      businessHours: shop.businessHours,
      shopStatus: shop.shopStatus,
      shopType: shop.shopType,
      shopMode: shop.shopMode,
      promotionInfo: shop.promotionInfo,
      telphoneList: shop.telphoneList,
      logo: (shop.logo || '')
        .replace(/\//gi, '')
        .replace('.png', '.jpg')
        .replace('sp_mall', 'https://i1.mallcoo.cn/sp_mall/'),
    }));
    Shop.insertMany(shopList);
  }
});

server.listen({ port: 5100 }).then(res => {
  console.info(`[Info] ApolloServer running at ${res.url}`);
});
