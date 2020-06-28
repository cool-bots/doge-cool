import { SlackContext } from 'bottender';
import { generateWow, generateCongrats } from './utils';

const sendDoge = async (
  context: SlackContext,
  block_io: any,
  recipients: string[],
  amount: number
) => {
  const sender = context.event._rawEvent.user;
  const channel = context.event._rawEvent.channel;
  const timestamp = context.event._rawEvent.ts;
  const minCoinsPerMember = 2;

  if (amount < recipients.length * minCoinsPerMember) {
    await context.chat.postEphemeral({
      text: 'You are too stingy',
    });
    return;
  }

  // React to original message in channel
  await context.client.callMethod('reactions.add', {
    channel,
    name: 'cool-doge',
    timestamp,
  });

  // Notify the users
  recipients.forEach(async (recipient: string) => {
    await context.client.postMessage(
      recipient,
      `${generateCongrats()} <@${recipient}> you just received ${
        amount / recipients.length
      } doge from <@${sender}>. ${generateWow()}`
    );
  });

  return;

  block_io.withdraw_from_labels(
    {
      from_labels: sender,
      to_labels: recipients.join(), //'member,member,member'
      amounts: new Array(recipients.length)
        .fill(amount / recipients.length)
        .join(), //''6,6,6'
      pin: process.env.BLOCK_IO_SECRET_PIN,
    },
    async (error: any, data: any) => {
      if (error) {
        let errorToThrow = error.message;

        if (error.message.includes('Maximum withdrawable balance is')) {
          errorToThrow = `Oh no!!! You don't have enough funds! Please DM me to top up your balance...`;
        }

        // Notify the user about the error
        await context.chat.postEphemeral({
          text: errorToThrow,
        });
        return;
      }

      // React to original message in channel
      await context.client.callMethod('reactions.add', {
        channel,
        name: 'cool-doge',
        timestamp,
      });

      // Notify the users
      recipients.forEach(async (recipient: string) => {
        await context.client.postMessage(
          recipient,
          `${generateCongrats()} <@${recipient}> you just received ${
            amount / recipients.length
          } doge from <@${sender}>. ${generateWow()}`
        );
      });
    }
  );
};

export default sendDoge;
