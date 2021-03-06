import { Form, Input, Button } from "antd";
import { useMutation } from "@apollo/client";

import { useMessages } from "../../context/messages";
import { GET_MESSAGES_QUERY } from "../../gql/queries/messages";
import {
  SEND_MESSAGE_MUTATION,
  UPDATE_MESSAGE_MUTATION,
} from "../../gql/mutations/messages";

import styles from "./styles.module.scss";

interface FormTypes {
  message: string;
}

function MessageForm() {
  const [form] = Form.useForm();

  const [sendMessage] = useMutation(SEND_MESSAGE_MUTATION, {
    refetchQueries: [{ query: GET_MESSAGES_QUERY }, "GetMessagesQuery"],
  });
  const [updateMessage] = useMutation(UPDATE_MESSAGE_MUTATION, {
    refetchQueries: [{ query: GET_MESSAGES_QUERY }, "GetMessagesQuery"],
  });

  const { currentMessage, setMessageToEdit } = useMessages();

  const onFinish = async ({ message }: FormTypes) => {
    form.resetFields();

    if (currentMessage) {
      setMessageToEdit(null);

      await updateMessage({ variables: { id: currentMessage.id, message } });
    } else {
      await sendMessage({ variables: { message } });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <Form
          form={form}
          name="basic"
          fields={
            currentMessage
              ? [{ name: ["message"], value: currentMessage.message }]
              : undefined
          }
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item label="Message" name="message">
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Send
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default MessageForm;
