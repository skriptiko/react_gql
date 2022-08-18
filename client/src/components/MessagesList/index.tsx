import Message from "../Message";
import { GqlMessage } from "../../gql/types/messages";

import styles from "./styles.module.scss";

interface MessagesListProps {
  messages: GqlMessage[];
  loading: boolean;
}

function MessagesList({ messages, loading }: MessagesListProps): JSX.Element {
  return (
    <div className={styles.container}>
      {!loading &&
        messages.map((item) => <Message message={item} key={item.id} />)}
    </div>
  );
}

export default MessagesList;
