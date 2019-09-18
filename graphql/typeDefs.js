/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-14 22:43:45
 * @LastEditTime: 2019-09-18 14:50:21
 * @LastEditors: Please set LastEditors
 */
const gql = require('graphql-tag');

module.exports = gql`
  scalar Date
  scalar Coordinates

  type Post {
    id: ID!
    body: String!
    createdAt: Date!
    updatedAt: Date!
    username: String!
    likes: [Like]!
    likeCount: Int!
    comments: [Comment]!
    commentCount: Int!
  }

  type Comment {
    id: ID!
    body: String!
    createdAt: Date!
    username: String!
  }

  type Like {
    id: ID!
    createdAt: String!
    username: String!
  }

  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
    updatedAt: Date!
  }

  type Floor {
    number: String!
    name: String!
    center: Coordinates!
    navigation: Coordinates!
    polygons: [Coordinates]
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
    getFloor(floorNumber: String!): [Floor]
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(body: String): Post!
    deletePost(postId: ID!): String!
    createComment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
  }
  
  type Subscription {
    newPost: Post!
  }
`;
