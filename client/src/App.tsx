import React from "react";
import "./App.css";
import { cache } from "./cache";

import {
  ApolloClient,
  NormalizedCacheObject,
  ApolloProvider,
  gql,
  useQuery,
} from "@apollo/client";

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    cartItems: [ID!]!
  }
`;

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  uri: "http://localhost:4000/graphql",
  headers: {
    authorization: localStorage.getItem("token") || "",
    "client-name": "Space Explorer [web]",
    "client-version": "1.0.0",
  },
  typeDefs,
  resolvers: {},
});

const GET_REQUESTS = gql`
  query GerRequests {
    requests {
      id
      type
      name
      createdAt
    }
  }
`;

function Home() {
  const { data } = useQuery(GET_REQUESTS);
  console.log(data);

  return <div className="App">App</div>;
}

function App() {
  return (
    <ApolloProvider client={client}>
      <Home />
    </ApolloProvider>
  );
}

export default App;
