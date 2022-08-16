export interface GqlMessage {
  id: string;
  text: string;
  urgent: boolean;
}

export type GqlQueryMessages = { messages: Array<GqlMessage> } | undefined;

export interface GqlUrgentMessagesInput {
  id: string;
  urgent: boolean;
}
