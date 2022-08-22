import { gql } from "@apollo/client";

export const GET_MESSAGES_QUERY = gql`
  query GetMessagesQuery($input: FilterMessageInput) {
    messages(input: $input) {
      id
      text
      urgent
      logo
    }
  }
`;
