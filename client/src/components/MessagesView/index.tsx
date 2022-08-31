import { useQuery } from "@apollo/client";
import { Button, Spin, Input } from "antd";
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
      await refetch({ input: { urgent: filterUrgent } });
    };

    refetchQuery().then();
  }, [filterUrgent]);

  const handleSearch = async (value: string) => {
    await refetch({ input: { text: value } });
  };

  return (
    <div className={styles.container}>
      <Button
        danger
        icon={<AlertOutlined />}
        shape="circle"
        type="primary"
        className={styles.filterButton}
        data-testid="urgent-button"
        onClick={() => setFilterUrgent(!filterUrgent)}
      />

      <Input.Search
        placeholder="input search text"
        allowClear
        onSearch={handleSearch}
        data-testid="search"
        onChange={(e) => handleSearch(e.target.value)}
      />

      {loading && (
        <div data-testid="loading" className={styles.spinnerContainer}>
          <Spin size="large" />
        </div>
      )}

      {data?.messages && <MessagesList messages={data?.messages} />}
    </div>
  );
}

export default MessagesView;
