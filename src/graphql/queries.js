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
  query GetSingleBounty($postId: ID!) {
    bounty(id: $postId) {
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
