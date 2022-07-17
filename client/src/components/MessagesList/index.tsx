import { Spin, Avatar, Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/client";

import { useMessages } from "../../context/messages";
import { GET_MESSAGES_QUERY } from "../../gql/queries/messages";
import { REMOVE_MESSAGE_MUTATION } from "../../gql/mutations/messages";
import { GqlMessage, GqlQueryMessages } from "../../gql/types/messages";

import styles from "./styles.module.scss";

function MessagesList(): JSX.Element {
  const { data, loading } = useQuery<GqlQueryMessages>(GET_MESSAGES_QUERY);

  const [removeMessage] = useMutation<string>(REMOVE_MESSAGE_MUTATION, {
    refetchQueries: [{ query: GET_MESSAGES_QUERY }, "GetMessagesQuery"],
  });

  const { setMessageToEdit } = useMessages();

  const onDeleteButtonClick = async (id: string) => {
    await removeMessage({ variables: { id } });
  };

  const onEditButtonClick = (message: GqlMessage) => {
    setMessageToEdit(message);
  };

  return (
    <div className={styles.container}>
      {loading && (
        <div className={styles.spinnerContainer}>
          <Spin size="large" />
        </div>
      )}

      {!loading &&
        data?.messages &&
        data?.messages.map((item) => (
          <div className={styles.message} key={item.id}>
            <Avatar
              size={50}
              src="https://joeschmoe.io/api/v1/random"
              className={styles.messageIcon}
            />

            <div className={styles.messageText}>
              {item.message}

              <Button
                shape="circle"
                size="small"
                className={styles.editButton}
                onClick={() => onEditButtonClick(item)}
              >
                <EditOutlined />
              </Button>

              <Button
                shape="circle"
                size="small"
                className={styles.deleteButton}
                onClick={() => onDeleteButtonClick(item.id)}
              >
                <DeleteOutlined />
              </Button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default MessagesList;
