export interface Context {
  event: {
    text: string;
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
