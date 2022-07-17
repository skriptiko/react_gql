import { gql } from "@apollo/client";

export const SEND_MESSAGE_MUTATION = gql`
  mutation SendMessage($message: String!) {
    sendMessage(input: { message: $message })
  }
`;

export const REMOVE_MESSAGE_MUTATION = gql`
  mutation RemoveMessage($id: String!) {
    removeMessage(id: $id)
  }
`;

export const UPDATE_MESSAGE_MUTATION = gql`
  mutation UpdateMessage($id: String!, $message: String!) {
    updateMessage(input: { id: $id, message: $message })
  }
`;
