import { gql } from "@apollo/client";

export const CREATE_MESSAGE_MUTATION = gql`
  mutation CreateMessage($text: String!, $logo: String!, $urgent: Boolean!) {
    createMessage(input: { text: $text, logo: $logo, urgent: $urgent })
  }
`;

export const REMOVE_MESSAGE_MUTATION = gql`
  mutation RemoveMessage($id: String!) {
    removeMessage(id: $id)
  }
`;

export const UPDATE_MESSAGE_MUTATION = gql`
  mutation UpdateMessage(
    $id: String!
    $text: String!
    $logo: String!
    $urgent: Boolean!
  ) {
    updateMessage(input: { id: $id, text: $text, logo: $logo, urgent: $urgent })
  }
`;

export const URGENT_MESSAGE_MUTATION = gql`
  mutation UrgentMessage($id: String!, $urgent: Boolean!) {
    urgentMessage(input: { id: $id, urgent: $urgent })
  }
`;
