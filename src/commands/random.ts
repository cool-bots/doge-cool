import { Context } from '../types/bottender';
import {
  generateWow,
  generateCongrats,
  getRandomArrayElements,
} from '../lib/utils';
import getChannelMembers from '../lib/members';

const random = async (context: Context, block_io: any, slackClient: any) => {
  const minCoins = 2;
  const userId = context.session.user.id;
  const channelId = context.session.channel.id;
  let members: string[] = await getChannelMembers(slackClient, channelId);
  let [, , amountText] = context.event.text.split(' ');
  const amount = Number(amountText);

  // Remove the current user and the bot so it does not get a shower
  members = members.filter(
    member => member !== userId && member !== process.env.BOT_USER_ID
  );

  if (amount < minCoins) {
    await context.sendText(`Much sad! Not enough doge :( `);
  } else {
    const member = getRandomArrayElements(members, 1);
    block_io.withdraw_from_labels(
      {
        from_labels: context.session.user.id,
        to_label: member,
        amount: amount,
        pin: process.env.BLOCK_IO_SECRET_PIN,
      },
      async (error: Error | undefined, data: any) => {
        console.log(data);
        if (error) return console.log('Error occured:', error.message);
        await context.sendText(
          `${generateCongrats()} Much luck! <@${member}> you just received ${amount} doge. ${generateWow()}`
        );
      }
    );
  }
};

export default random;
