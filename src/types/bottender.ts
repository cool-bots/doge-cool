export interface Context {
  session: {
    user: {
      id: string;
    };
  };
  sendText: (text: string) => Promise<void>;
}
