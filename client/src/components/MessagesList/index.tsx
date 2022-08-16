import { Spin } from "antd";
import { useQuery } from "@apollo/client";

import Message from "../Message";
import { GET_MESSAGES_QUERY } from "../../gql/queries/messages";
import { GqlQueryMessages } from "../../gql/types/messages";

import styles from "./styles.module.scss";

function MessagesList(): JSX.Element {
  const { data, loading } = useQuery<GqlQueryMessages>(GET_MESSAGES_QUERY);

  return (
    <div className={styles.container}>
      {loading && (
        <div className={styles.spinnerContainer}>
          <Spin size="large" />
        </div>
      )}

      {!loading &&
        data?.messages &&
        data?.messages.map((item) => <Message message={item} key={item.id} />)}
    </div>
  );
}

export default MessagesList;
