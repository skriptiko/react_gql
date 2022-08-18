import React from "react";
import {
  ApolloClient,
  NormalizedCacheObject,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client";

const cache = new InMemoryCache({});

import MessagesForm from "../MessageForm";

import { MessagesProvider } from "../../context/messages";

import styles from "./styles.module.scss";
import MessagesView from "../MessagesView";

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  uri: "http://localhost:4000/graphql",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <MessagesProvider>
        <div className={styles.container}>
          <MessagesView />

          <MessagesForm />
        </div>
      </MessagesProvider>
    </ApolloProvider>
  );
}

export default App;
