import { gql } from '@apollo/client';



export const MESSAGES_SUBSCRIPTION = gql`
  subscription messageSent($input: createMessageInput!) {
    messageSent(input: $input) {
      content
      conversationId
      userId
    }
  }
`;