import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";

import { MessagesProvider, useMessages } from "../messages";
import { Button } from "antd";

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };

function TestComponent() {
  const { currentMessage, setMessageToEdit } = useMessages();

  return (
    <>
      <div data-testid="text">{currentMessage?.text}</div>
      <Button
        data-testid="button"
        onClick={() =>
          setMessageToEdit({
            id: "id",
            text: "ddd",
            urgent: true,
            logo: "logo",
          })
        }
      >
        Button
      </Button>
    </>
  );
}

describe("messages context", () => {
  it("expect context working properly", async () => {
    const { findByTestId, queryByText, getByText } = render(
      <MessagesProvider>
        <TestComponent />
      </MessagesProvider>
    );

    expect(await queryByText("ddd")).not.toBeInTheDocument();

    const button = await findByTestId("button");

    fireEvent.click(button);

    expect(await getByText("ddd")).toBeInTheDocument();
  });
});
