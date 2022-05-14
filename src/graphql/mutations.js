import { gql } from '@apollo/client';

export const CREATE_USER_MUTATION = gql`
  mutation CreateNewUser($input: CreateUserInput!) {
    createUser(input: $input) {
      username
      password
    }
  }
`;

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($updateUserInput: UpdateUserInput!) {
    updateUser(input: $updateUserInput) {
      username
      password
      profileImg
    }
  }
`;

export const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($deleteUserId: ID!) {
    deleteUser(id: $deleteUserId) {
      id
    }
  }
`;
export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
        username
      }
    }
  }
`;

export const SIGIN_UP_USER = gql`
  mutation signup($username: String!, $password: String!) {
    signup(username: $username, password: $password) {
      token
      user {
        id
        username
      }
    }
  }
`;

export const CREATE_NEWS_SOURCE_MUTATION = gql`
  mutation createNewsSource($input: createNewsSourceInput!) {
    createNewsSource(input: $input) {
      title
      pagelink
      image
    }
  }
`;

export const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

export const CREATE_BOUNTY_MUTATION = gql`
  mutation createBounty($input: CreateBountyInput!) {
    createBounty(input: $input) {
      description
      title
      link
      reward
      image
      category
      userId
      newssourceId
      fakeorreal
    }
  }
`;

export const UPDATE_BOUNTY_MUTATION = gql`
  mutation updateBounty($input: UpdateBountyInput!) {
    updateBounty(input: $input) {
      id
      description
      link
      title
      reward
      positiveVote
      negativeVote
      fakeorreal
      category
      userId
      newssourceId
    }
  }
`;

export const DELETE_BOUNTY_MUTATION = gql`
  mutation deleteBounty($deletePostId: ID!) {
    deleteBounty(id: $deletePostId) {
      id
    }
  }
`;

export const CREATE_BOUNTY_VOTE_MUTATION = gql`
  mutation createBountyVote($input: createBountyVoteInput!) {
    createBountyVote(input: $input) {
      userId
      bountyId
      positiveVote
      negativeVote
    }
  }
`;

export const CREATE_MESSAGE_MUTATION = gql`
  mutation createMessage($input: createMessageInput!) {
    createMessage(input: $input) {
      content
      conversationId
      userId
    }
  }
`;

export const ADD_USER_TO_CONVERSATION = gql`
  mutation addUserToConversation($input: updateConversationInput!) {
    addUserToConversation(input: $input) {
      conversationId
      userId
      bountyId
    }
  }
`;
