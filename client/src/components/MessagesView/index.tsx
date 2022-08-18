import { useQuery } from "@apollo/client";
import { Button, Spin } from "antd";
import { AlertOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

import MessagesList from "../MessagesList";
import { GqlQueryMessages } from "../../gql/types/messages";
import { GET_MESSAGES_QUERY } from "../../gql/queries/messages";

import styles from "./styles.module.scss";

function MessagesView() {
  const { data, loading, refetch } =
    useQuery<GqlQueryMessages>(GET_MESSAGES_QUERY);

  const [filterUrgent, setFilterUrgent] = useState(false);

  useEffect(() => {
    const refetchQuery = async () => {
      await refetch({ urgent: filterUrgent });
    };

    refetchQuery().then();
  }, [filterUrgent]);

  return (
    <div className={styles.container}>
      <Button
        danger
        icon={<AlertOutlined />}
        shape="circle"
        type="primary"
        className={styles.filterButton}
        onClick={() => setFilterUrgent(!filterUrgent)}
      />

      {loading && (
        <div className={styles.spinnerContainer}>
          <Spin size="large" />
        </div>
      )}

      {data?.messages && (
        <MessagesList messages={data.messages} loading={loading} />
      )}
    </div>
  );
}

export default MessagesView;
