import "@testing-library/jest-dom";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

import MessagesForm from "../index";
import { MessagesContext } from "../../../context/messages";
import {
  CREATE_MESSAGE_MUTATION,
  UPDATE_MESSAGE_MUTATION,
} from "../../../gql/mutations/messages";

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };

describe("MessagesForm", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("expect render without errors", async () => {
    render(
      <MockedProvider mocks={[]}>
        <MessagesForm />
      </MockedProvider>
    );

    expect(await screen.getByLabelText("User")).toBeInTheDocument();
    expect(await screen.getByLabelText("Message")).toBeInTheDocument();
    expect(await screen.getByRole("button")).toBeInTheDocument();
    expect(await screen.getByRole("button")).toHaveAttribute("type", "submit");
  });

  it("expect render form default value", async () => {
    render(
      <MockedProvider mocks={[]}>
        <MessagesContext.Provider
          value={{
            currentMessage: {
              id: "3J1zGBKSDeMfQtH9CViTc",
              text: "test",
              urgent: true,
              logo: "link",
            },
            setMessageToEdit: jest.fn(),
          }}
        >
          <MessagesForm />
        </MessagesContext.Provider>
      </MockedProvider>
    );

    expect(await screen.getByText("test").textContent).toBe("test");
    expect(await screen.getByLabelText("Urgent")).toBeChecked();
    expect(await screen.getByText("link")).toBeInTheDocument();
  });

  it("expect create message form work properly", async () => {
    const resultSpy = jest.fn().mockReturnValue({
      data: { messages: [] },
    });

    render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: CREATE_MESSAGE_MUTATION,
              variables: {
                text: "text",
                logo: "https://joeschmoe.io/api/v1/james",
                urgent: false,
              },
            },
            result: resultSpy,
            newData: resultSpy,
          },
        ]}
      >
        <MessagesForm />
      </MockedProvider>
    );

    const submitButton = await screen.getByRole("button");
    const textarea = await screen.getByTestId("textarea");

    fireEvent.change(textarea, { target: { value: "text" } });

    fireEvent.click(submitButton);

    await waitFor(() => expect(resultSpy).toBeCalledTimes(1));
  });

  it("expect update message form work properly", async () => {
    const resultSpy = jest.fn().mockReturnValue({
      data: { messages: [] },
    });

    render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: UPDATE_MESSAGE_MUTATION,
              variables: {
                id: "3J1zGBKSDeMfQtH9CViTc",
                text: "test",
                logo: "link",
                urgent: true,
              },
            },
            result: resultSpy,
            newData: resultSpy,
          },
        ]}
      >
        <MessagesContext.Provider
          value={{
            currentMessage: {
              id: "3J1zGBKSDeMfQtH9CViTc",
              text: "test",
              urgent: true,
              logo: "link",
            },
            setMessageToEdit: jest.fn(),
          }}
        >
          <MessagesForm />
        </MessagesContext.Provider>
      </MockedProvider>
    );

    const submitButton = await screen.getByRole("button");

    fireEvent.click(submitButton);

    await waitFor(() => expect(resultSpy).toBeCalledTimes(1));
  });
});
