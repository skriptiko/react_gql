import "@testing-library/jest-dom";
import { render, waitFor, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import userEvent from "@testing-library/user-event";

import MessagesView from "../index";
import { GET_MESSAGES_QUERY } from "../../../gql/queries/messages";

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };

describe("MessagesView", () => {
  const resultFn = jest.fn().mockReturnValue({
    data: {
      messages: [
        {
          id: "id",
          text: "ddd",
          urgent: true,
          logo: "link",
        },
      ],
    },
  });

  beforeEach(() => {
    render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: GET_MESSAGES_QUERY,
              variables: { input: { urgent: false } },
            },
            result: resultFn,
          },
          {
            request: {
              query: GET_MESSAGES_QUERY,
              variables: { input: { urgent: true } },
            },
            result: resultFn,
          },
          {
            request: {
              query: GET_MESSAGES_QUERY,
              variables: { input: { text: "s" } },
            },
            result: resultFn,
          },
        ]}
        addTypename={false}
      >
        <MessagesView />
      </MockedProvider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("expect render without errors", async () => {
    expect(await screen.findByTestId("urgent-button")).toBeInTheDocument();
    expect(await screen.findByTestId("search")).toBeInTheDocument();
    expect(await screen.findByTestId("loading")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId("messages-list")).toBeInTheDocument();
      expect(screen.getByText("ddd")).toBeInTheDocument();
    });
  });

  it("expect refetch urgent messages", async () => {
    const button = await screen.findByTestId("urgent-button");

    expect(resultFn).toBeCalledTimes(0);

    await userEvent.click(button);

    expect(resultFn).toBeCalledTimes(2);
  });

  it("expect refetch search messages", async () => {
    const search = await screen.findByTestId("search");

    expect(resultFn).toBeCalledTimes(0);

    await userEvent.type(search, "s");

    expect(search).toHaveValue("s");

    expect(resultFn).toBeCalledTimes(2);
  });
});
