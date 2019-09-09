const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const Post = require('./models/Post');

const typeDefs = gql`
  type Post {
    _id: ID!
    body: String!
    createAt: String!
    username: String!
  }

  type Query {
    getPosts: [Post]
  }
`;

const resolvers = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find();
        return posts;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect('mongodb://localhost:27017/apollo_serv', { useNewUrlParser: true })
  .then(() => {
    console.log('mongoose connected.')
    return server.listen({ port: 5000 });
  })
  .then(res => {
    console.log(`Server running at ${res.url}.`);
  });
