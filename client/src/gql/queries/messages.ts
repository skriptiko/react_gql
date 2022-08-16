import { gql } from "@apollo/client";

export const GET_MESSAGES_QUERY = gql`
  query GetMessagesQuery {
    messages {
      id
      text
      urgent
    }
  }
`;
