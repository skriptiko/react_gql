const { gql } = require('apollo-server');

const typeDefs = gql`
  scalar Void
  
  type Message {
    id: String!
    message: String!
  }

  input CreateMessageInput {
    message: String!
  }

  input UpdateMessageInput {
    id: String!
    message: String!
  }

  type Query {
    messages: [Message]
    message(id: String!): Message!
  }

  type Mutation {
    sendMessage(input: CreateMessageInput): Void
    removeMessage(id: String!): Void
    updateMessage(input: UpdateMessageInput): Void
  }
`;

module.exports = typeDefs
