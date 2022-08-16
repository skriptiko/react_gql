import { useMutation } from "@apollo/client";
import { AlertOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ItemType } from "antd/lib/menu/hooks/useItems";

import { useMessages } from "../../../context/messages";
import { GET_MESSAGES_QUERY } from "../../../gql/queries/messages";
import {
  REMOVE_MESSAGE_MUTATION,
  URGENT_MESSAGE_MUTATION,
} from "../../../gql/mutations/messages";
import {
  GqlMessage,
  GqlUrgentMessagesInput,
} from "../../../gql/types/messages";

function useMenuActions(message: GqlMessage) {
  const { setMessageToEdit } = useMessages();

  const [removeMessage] = useMutation<string>(REMOVE_MESSAGE_MUTATION, {
    refetchQueries: [{ query: GET_MESSAGES_QUERY }, "GetMessagesQuery"],
  });

  const [urgentMessage] = useMutation<GqlUrgentMessagesInput>(
    URGENT_MESSAGE_MUTATION,
    {
      refetchQueries: [{ query: GET_MESSAGES_QUERY }, "GetMessagesQuery"],
    }
  );

  const menuItems = [
    {
      key: "1",
      icon: <EditOutlined />,
    },
    {
      key: "2",
      icon: <AlertOutlined />,
    },
    {
      key: "3",
      icon: <DeleteOutlined />,
    },
  ];

  const handleDeleteButtonClick = async () => {
    await removeMessage({ variables: { id: message.id } });
  };

  const handleUrgentButtonClick = async () => {
    await urgentMessage({
      variables: { id: message.id, urgent: !message.urgent },
    });
  };

  const handleEditButtonClick = () => {
    setMessageToEdit(message);
  };

  const handleMenuClick = (item: ItemType) => {
    if (item?.key === "1") {
      handleEditButtonClick();
    }

    if (item?.key === "2") {
      handleUrgentButtonClick().then();
    }

    if (item?.key === "3") {
      handleDeleteButtonClick().then();
    }
  };

  return { menuItems, handleMenuClick };
}

export default useMenuActions;
