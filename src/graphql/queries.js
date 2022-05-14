import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      username
      password
      profileImg
      wallet
    }
  }
`;

export const GET_SINGLE_USER = gql`
  query user($token: String!) {
    user(token: $token) {
      id
      username
      password
      profileImg
      wallet
      admin
    }
  }
`;

export const LOGIN = gql`
  query Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      userId
      tokenExpiration
      token
    }
  }
`;

export const GET_ALL_NEWS_SOURCES = gql`
  query newssources {
    newssources {
      id
      title
      image
      pagelink
      rating
    }
  }
`;

export const GET_SINGLE_NEWS_SOURCE = gql`
  query newssource($id: ID!) {
    newssource(id: $id) {
      title
      rating
      image
      pagelink
    }
  }
`;

export const GET_ALL_BOUNTIES = gql`
  query GetAllBounties {
    bounties {
      description
      title
      id
      link
      reward
      positiveVote
      negativeVote
      category
      image
      fakeorreal
      userId
      newssourceId
      createdAt
    }
  }
`;

export const GET_SINGLE_BOUNTY = gql`
  query GetSingleBounty($bountyId: ID!) {
    bounty(bountyId: $bountyId) {
      description
      title
      id
      link
      reward
      positiveVote
      negativeVote
      category
      image
      fakeorreal
      userId
      newssourceId
      createdAt
    }
  }
`;

export const GET_ALL_BOUNTY_VOTES = gql`
  query bountyvotes {
    bountyvotes {
      bountyId
      userId
      negativeVote
      positiveVote
    }
  }
`;

export const GET_USER_BOUNTY_VOTES = gql`
  query ($userId: ID!) {
    userbountyvotes(userId: $userId) {
      userId
      bountyId
      negativeVote
      positiveVote
    }
  }
`;

export const GET_SINGLE_BOUNTY_VOTES = gql`
  query ($bountyId: ID!) {
    singlebountyvotes(bountyId: $bountyId) {
      userId
      bountyId
      negativeVote
      positiveVote
    }
  }
`;

export const GET_BOUNTY_CONVERSATION = gql`
  query ($bountyId: ID!) {
    bountyConversation(bountyId: $bountyId) {
    id
    users 
    bountyId
    }
  }
`;

export const GET_CONVERSATION_MESSAGES = gql`
  query ($conversationId: ID!) {
    conversationMessages(conversationId: $conversationId) {
      id
      userId
      content
      conversationId
    }
  }
`;
