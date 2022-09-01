import "@testing-library/jest-dom";
import { Button } from "antd";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

import useMenuActions from "../useMenuActions";
import {
  REMOVE_MESSAGE_MUTATION,
  URGENT_MESSAGE_MUTATION,
} from "../../gql/mutations/messages";
import { MessagesContext } from "../../context/messages";

function TestComponent() {
  const { menuItems, handleMenuClick } = useMenuActions({
    id: "id",
    text: "ddd",
    urgent: true,
    logo: "logo",
  });

  return (
    <div>
      {menuItems.map((item) => {
        return (
          <div data-testid="menu-items" key={item.key}>
            {item.key}
          </div>
        );
      })}

      <Button
        data-testid="button"
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onClick={(e) => handleMenuClick({ key: e.target.value })}
      >
        Button
      </Button>
    </div>
  );
}

describe("useMenuActions", () => {
  const removeResultSpy = jest.fn();
  const urgentResultSpy = jest.fn();
  const setMessageSpy = jest.fn();

  it("expect menu handle function work properly", async () => {
    const { getAllByTestId, findByTestId } = render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: REMOVE_MESSAGE_MUTATION,
              variables: { id: "id" },
            },
            result: removeResultSpy,
            newData: removeResultSpy,
          },
          {
            request: {
              query: URGENT_MESSAGE_MUTATION,
              variables: { id: "id", urgent: false },
            },
            result: urgentResultSpy,
            newData: urgentResultSpy,
          },
        ]}
      >
        <MessagesContext.Provider
          value={{ currentMessage: null, setMessageToEdit: setMessageSpy }}
        >
          <TestComponent />
        </MessagesContext.Provider>
      </MockedProvider>
    );

    const button = await findByTestId("button");

    expect(await getAllByTestId("menu-items").length).toBe(3);

    fireEvent.click(button, { target: { value: "1" } });

    expect(setMessageSpy).toBeCalledTimes(1);

    fireEvent.click(button, { target: { value: "2" } });

    await waitFor(() => expect(urgentResultSpy).toBeCalledTimes(1));

    fireEvent.click(button, { target: { value: "3" } });

    await waitFor(() => expect(removeResultSpy).toBeCalledTimes(1));
  });
});
