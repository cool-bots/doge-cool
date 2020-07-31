export enum MessageTypes {
  MESSAGE = 'message',
  MENTION = 'app_mention',
}

export interface TipArgs {
  recipient: string | string[];
  amount: number;
}
