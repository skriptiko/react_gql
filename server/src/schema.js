const { gql } = require('apollo-server');

const typeDefs = gql`
  scalar Void
  
  type Message {
    id: String!
    text: String!
    urgent: Boolean!
    logo: String!
  }
  

  input CreateMessageInput {
    text: String!
    logo: String!
    urgent: Boolean!
  }

  input UpdateMessageInput {
    id: String!
    text: String!
    logo: String!
    urgent: Boolean!
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
    createMessage(input: CreateMessageInput): Void
    removeMessage(id: String!): Void
    updateMessage(input: UpdateMessageInput): Void
    urgentMessage(input: UrgentMessageInput): Void
  }
`;

module.exports = typeDefs
