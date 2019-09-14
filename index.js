const { ApolloServer } = require('apollo-server');

const mongoose = require('mongoose');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const Post = require('./models/Post');
const User = require('./models/User');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect('mongodb://localhost:27017/apollo_serv', { useNewUrlParser: true })
  .then(async () => {
    console.log('mongoose connected');
    let users = await User.find({});

    // init database
    if (users.length === 0) {
      console.log('[init database]');
      users = await User.insertMany([
        {
          username: 'jerry',
          password: '123123',
          email: 'jerry@123.com',
        },
        {
          username: 'szy0syz',
          password: '123123',
          email: 'szy0syz@123.com',
        },
        {
          username: 'jerry1',
          password: '123123',
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
    return server.listen({ port: 5100 });
  })
  .then(res => {
    console.log(`Server running at ${res.url}`);
  });
