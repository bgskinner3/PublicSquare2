const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Upload
  scalar Date
  type File {
    url: String!
  }
  type Bounty {
    id: ID!
    title: String!
    description: String
    link: String
    reward: Float
    userId: ID!
    newssourceId: ID!
    image: String
    fakeorreal: FakeOrReal
    positiveVote: Int
    negativeVote: Int
    category: Category
    createdAt: Date
  }
  type User {
    id: ID!
    username: String!
    password: String
    profileImg: String
    wallet: Int
    admin: Boolean!
  }
  type BountyVote {
    positiveVote: Int
    negativeVote: Int
    userId: ID!
    bountyId: ID!
  }
  type NewsSource {
    id: ID!
    image: String
    title: String
    rating: Int
    pagelink: String
  }
  type Query {
    users: [User!]!
    user(token: String!): User!
    bounties: [Bounty!]!
    bounty(id: ID!): Bounty!
    newssources: [NewsSource!]!
    newssource(id: ID!): NewsSource
    bountyvotes: [BountyVote!]!
    bountyvote(id: ID!): BountyVote!
    userbountyvotes(userId: ID!): [BountyVote!]
    singlebountyvotes(bountyId: ID!): [BountyVote!]
  }
  input UserInput {
    username: String!
    password: String!
  }
  input CreateUserInput {
    username: String!
    password: String!
    profileImg: String
  }
  input UpdateUserInput {
    id: ID!
    newUsername: String
    newPassword: String
    newprofileImg: String
  }
  type AuthPayload {
    token: String!
    user: User!
  }
  input UpdateBountyInput {
    id: ID!
    newdescription: String
    newlink: String
    newtitle: String
    newreward: String
    newpositiveVote: Int
    newnegativeVote: Int
    newfakeorreal: FakeOrReal
  }
  input CreateBountyInput {
    title: String!
    description: String!
    link: String!
    reward: Float!
    image: String!
    userId: ID!
    newssourceId: ID!
    category: Category!
    fakeorreal: FakeOrReal
  }
  input createNewsSourceInput {
    image: String
    title: String
    pagelink: String
  }
  input createBountyVoteInput {
    userId: ID!
    bountyId: ID!
    positiveVote: Int
    negativeVote: Int
  }
  type Mutation {
    login(username: String!, password: String!): AuthPayload!
    signup(username: String!, password: String!): AuthPayload!
    createUser(input: CreateUserInput!): User
    updateUser(input: UpdateUserInput!): User!
    deleteUser(id: ID!): User
    createBounty(input: CreateBountyInput!): Bounty
    updateBounty(input: UpdateBountyInput!): Bounty!
    deleteBounty(id: ID!): Bounty
    createNewsSource(input: createNewsSourceInput!): NewsSource
    deleteNewsSource(id: ID!): NewsSource
    uploadFile(file: Upload!): File!
    createBountyVote(input: createBountyVoteInput!): BountyVote
  }
  enum FakeOrReal {
    fake
    real
    pending
  }
  enum Category {
    health
    politics
    technology
    world
    business
    entertainment
    fintech
  }
`;
module.exports = { typeDefs };
