const { gql } = require('apollo-server');

const typeDefs = gql`
  scalar Void
  
  type Message {
    id: String!
    text: String!
    urgent: Boolean!
  }
  

  input CreateMessageInput {
    text: String!
  }

  input UpdateMessageInput {
    id: String!
    text: String!
  }

  input UrgentMessageInput {
    id: String!
    urgent: Boolean!
  }
  

  type Query {
    messages: [Message]
    message(id: String!): Message!
  }

  type Mutation {
    sendMessage(input: CreateMessageInput): Void
    removeMessage(id: String!): Void
    updateMessage(input: UpdateMessageInput): Void
    urgentMessage(input: UrgentMessageInput): Void
  }
`;

module.exports = typeDefs
