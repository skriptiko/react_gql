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
    messages(urgent: Boolean): [Message]!
  }

  type Mutation {
    createMessage(input: CreateMessageInput): Message!
    removeMessage(id: String!): Void
    updateMessage(input: UpdateMessageInput): Message!
    urgentMessage(input: UrgentMessageInput): Message!
  }
`;

module.exports = typeDefs
