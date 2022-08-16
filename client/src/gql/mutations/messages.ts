import { gql } from "@apollo/client";

export const SEND_MESSAGE_MUTATION = gql`
  mutation SendMessage($text: String!) {
    sendMessage(input: { text: $text })
  }
`;

export const REMOVE_MESSAGE_MUTATION = gql`
  mutation RemoveMessage($id: String!) {
    removeMessage(id: $id)
  }
`;

export const UPDATE_MESSAGE_MUTATION = gql`
  mutation UpdateMessage($id: String!, $text: String!) {
    updateMessage(input: { id: $id, text: $text })
  }
`;

export const URGENT_MESSAGE_MUTATION = gql`
  mutation UrgentMessage($id: String!, $urgent: Boolean!) {
    urgentMessage(input: { id: $id, urgent: $urgent })
  }
`;
