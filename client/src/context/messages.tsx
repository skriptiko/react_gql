import { createContext, ReactNode, useContext, useState } from "react";

import { GqlMessage } from "../gql/types/messages";

type MessagesContextType = {
  currentMessage: GqlMessage | null;
  setMessageToEdit: (message: GqlMessage | null) => void;
};

type MessagesProviderType = {
  children?: ReactNode;
};

export const MessagesContext = createContext<MessagesContextType>({
  currentMessage: null,
  setMessageToEdit: () => undefined,
});

export const MessagesProvider = ({
  children,
}: MessagesProviderType): JSX.Element => {
  const [currentMessage, setCurrentMessage] = useState<GqlMessage | null>(null);

  const setMessageToEdit = (message: GqlMessage | null) => {
    setCurrentMessage(message);
  };

  return (
    <MessagesContext.Provider value={{ currentMessage, setMessageToEdit }}>
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessages = (): MessagesContextType =>
  useContext(MessagesContext);
