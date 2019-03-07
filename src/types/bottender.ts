export interface Context {
  event: {
    text: string;
    isChannelsMessage: boolean;
    isGroupsMessage: boolean;
    isText: boolean;
  };
  session: {
    user: {
      id: string;
    };
    channel: {
      id: string;
    };
  };
  sendText: (text: string) => Promise<void>;
}
