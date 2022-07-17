export interface GqlMessage {
  id: string;
  message: string;
}

export type GqlQueryMessages = { messages: Array<GqlMessage> } | undefined;
