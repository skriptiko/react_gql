import React from "react";
import {
  ApolloClient,
  NormalizedCacheObject,
  ApolloProvider,
} from "@apollo/client";

import { cache } from "../../cache";

import MessagesList from "../MessagesList";
import MessagesForm from "../MessageForm";

import { MessagesProvider } from "../../context/messages";

import styles from "./styles.module.scss";

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  uri: "http://localhost:4000/graphql",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <MessagesProvider>
        <div className={styles.container}>
          <MessagesList />

          <MessagesForm />
        </div>
      </MessagesProvider>
    </ApolloProvider>
  );
}

export default App;
