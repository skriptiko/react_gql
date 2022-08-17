import { Form, Input, Button, Checkbox, Select, Avatar } from "antd";
import { useMutation } from "@apollo/client";

import { useMessages } from "../../context/messages";
import { GET_MESSAGES_QUERY } from "../../gql/queries/messages";
import { GqlQueryMessages } from "../../gql/types/messages";
import getJoeschmoeLogo from "./utils/getJoeschmoeLogo";
import {
  CREATE_MESSAGE_MUTATION,
  UPDATE_MESSAGE_MUTATION,
} from "../../gql/mutations/messages";

import styles from "./styles.module.scss";

const USERS = [
  "james",
  "jess",
  "jeane",
  "jean",
  "jake",
  "jed",
  "jia",
  "jabala",
  "joe",
  "jodi",
  "julie",
  "jacques",
];

interface FormTypes {
  text: string;
  urgent: boolean;
  logo: string;
}

function MessageForm() {
  const [form] = Form.useForm();

  const [createMessage] = useMutation(CREATE_MESSAGE_MUTATION, {
    update(cache, { data }) {
      const existingMessages = cache.readQuery<GqlQueryMessages>({
        query: GET_MESSAGES_QUERY,
      });
      cache.writeQuery({
        query: GET_MESSAGES_QUERY,
        data: {
          messages: existingMessages?.messages.concat([data.createMessage]),
        },
      });
    },
  });
  const [updateMessage] = useMutation(UPDATE_MESSAGE_MUTATION, {
    update(cache, { data }) {
      const existingMessages = cache.readQuery<GqlQueryMessages>({
        query: GET_MESSAGES_QUERY,
      });
      cache.writeQuery({
        query: GET_MESSAGES_QUERY,
        data: {
          messages: existingMessages?.messages.map((item) => {
            if (item.id === data.updateMessage.id) {
              return { ...item, ...data.updateMessage };
            } else {
              return item;
            }
          }),
        },
      });
    },
  });

  const { currentMessage, setMessageToEdit } = useMessages();

  const onFinish = async ({ text, urgent, logo }: FormTypes) => {
    form.resetFields();

    if (currentMessage) {
      setMessageToEdit(null);

      await updateMessage({
        variables: { id: currentMessage.id, text, logo, urgent },
      });
    } else {
      await createMessage({ variables: { text, logo, urgent } });
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
              ? [
                  { name: ["text"], value: currentMessage.text },
                  { name: ["urgent"], value: currentMessage.urgent },
                  { name: ["logo"], value: currentMessage.logo },
                ]
              : undefined
          }
          onFinish={onFinish}
          autoComplete="off"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          initialValues={{
            logo: getJoeschmoeLogo(USERS[0]),
            urgent: false,
            text: "",
          }}
        >
          <Form.Item label="User" name="logo">
            <Select style={{ width: 85 }}>
              {USERS.map((item) => (
                <Select.Option key={item} value={getJoeschmoeLogo(item)}>
                  <Avatar size={40} src={getJoeschmoeLogo(item)} />
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Message"
            name="text"
            rules={[{ required: true, message: "Please input your message" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item label="Urgent" valuePropName="checked" name="urgent">
            <Checkbox />
          </Form.Item>

          <Form.Item>
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
