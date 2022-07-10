const { gql } = require('apollo-server')

const typeDefs = gql`
type Request {
  id: ID!
  type: String!
  name: String!
  createdAt: Int!
}

input RequestInput {
  type: String!
}

input NewRequestInput {
  name: String!
  type: RequestInput!
}

type Query {
  requests(input: RequestInput): [Request]!
  request(id: ID!): Request!
}

type Mutation {
  createRequest(input: NewRequestInput!): Request!
}
`;

module.exports = typeDefs
