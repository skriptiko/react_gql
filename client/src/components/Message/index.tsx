import { Avatar } from "antd";
import { AlertOutlined } from "@ant-design/icons";

import Menu from "../Menu";
import { GqlMessage } from "../../gql/types/messages";
import useMenuActions from "../../hooks/useMenuActions";

import styles from "./styles.module.scss";

interface MessageProps {
  message: GqlMessage;
}

function Message({ message }: MessageProps): JSX.Element {
  const { menuItems, handleMenuClick } = useMenuActions(message);

  return (
    <div className={styles.container}>
      <Avatar size={50} src={message.logo} className={styles.messageIcon} />

      <div className={styles.messageText}>
        {message.text}

        {message.urgent && (
          <div className={styles.messageText__urgent}>
            <AlertOutlined />
          </div>
        )}
      </div>

      <Menu items={menuItems} onClick={handleMenuClick} />
    </div>
  );
}

export default Message;
