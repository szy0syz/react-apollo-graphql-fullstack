/*
 * @Description: In User Settings Edit
 * @Author: jerry shi
 * @Date: 2019-09-14 22:43:45
 * @LastEditTime: 2019-09-29 15:45:41
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

  type Shop {
    number: String!
    name: String!
    color: String!
    center: Coordinates!
    navigation: Coordinates!
    polygons: [Coordinates]
  }

  type TelphoneItem {
    PhoneRemark: String
    Phone: String
  }

  type HShop {
    id: ID!
    floor: Int!
    name: String!
    logo: String
    commercialTypeID: Int!
    commercialTypeName: String!
    subCommercialTypeName: String!
    floorName: String!
    doorNo: String!
    businessHours: String!
    shopStatus: String!
    shopType: String!
    shopMode: String!
    promotionInfo: String
    telphoneList: [TelphoneItem]
  }

  type Floor {
    number: String!
    name: String!
    color: String!
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
    getShop(shopNumber: String!): Shop
    getShops(shopNumber: String!): [Shop]
    getHShop(shopId: ID!): HShop
    getHShops(floor: Int, sortBy: String, commercialTypeID: Int, offset: Int, limit: Int): [HShop]
    getHShopsByName(name: String!): [HShop]
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
