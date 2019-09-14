const { ApolloServer } = require('apollo-server');

const mongoose = require('mongoose');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect('mongodb://localhost:27017/apollo_serv', { useNewUrlParser: true })
  .then(() => {
    console.log('mongoose connected');
    return server.listen({ port: 5100 });
  })
  .then(res => {
    console.log(`Server running at ${res.url}`);
  });
