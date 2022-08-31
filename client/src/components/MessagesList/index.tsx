import Message from "../Message";
import { GqlMessage } from "../../gql/types/messages";

import styles from "./styles.module.scss";

interface MessagesListProps {
  messages: GqlMessage[];
}

function MessagesList({ messages }: MessagesListProps): JSX.Element {
  return (
    <div className={styles.container} data-testid="messages-list">
      {messages.map((item) => (
        <Message message={item} key={item.id} />
      ))}
    </div>
  );
}

export default MessagesList;
