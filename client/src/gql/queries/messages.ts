import { gql } from "@apollo/client";

export const GET_MESSAGES_QUERY = gql`
  query GetMessagesQuery($urgent: Boolean) {
    messages(urgent: $urgent) {
      id
      text
      urgent
      logo
    }
  }
`;
