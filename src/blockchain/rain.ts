import { Context } from '../types/bottender';
import * as utils from '../lib/utils';
import { getChannelMembers } from '../lib/members';

const validateAmount = (amount: number | undefined) => amount && amount > 0;

export const rain = async (
  context: Context,
  block_io: any,
  slackClient: any
) => {
  const maxMembers = 5;
  const minCoinsPerMember = 2;
  const userId = context.session.user.id;
  const botMemberId = process.env.BOT_CHANNEL_MEMBER_ID;
  const botId = process.env.BOT_USER_ID;
  const channelId = context.session.channel.id;
  const [, , rawAmount] = context.event.text.split(' ');
  const amount = Number(parseFloat(rawAmount));
  if (!validateAmount(amount)) {
    return context.sendText(`:( Amount not valid`);
  }
  const members = await getChannelMembers(slackClient, channelId);
  const filteredMembers = members
    .filter((member: any) => member !== userId)
    .filter((member: any) => member !== botMemberId)
    .filter((member: any) => member !== botId);

  const pickedMembers = utils.getRandomArrayElements(
    filteredMembers,
    maxMembers
  );

  if (amount < pickedMembers.length * minCoinsPerMember) {
    return await context.sendText(`You are too stingy`);
  }

  console.log('the bot id', botId);
  console.log('the user id', userId);
  console.log('the members', pickedMembers.join());

  block_io.withdraw_from_labels(
    {
      from_labels: context.session.user.id,
      to_labels: pickedMembers.join(), //'member,member,member'
      amounts: new Array(pickedMembers.length)
        .fill(amount / pickedMembers.length)
        .join(), //''6,6,6'
      pin: process.env.BLOCK_IO_SECRET_PIN,
    },
    async (error: any, data: any) => {
      // error.message
      if (error) {
        let errorToThrow = error;

        if (error.message.includes('Maximum withdrawable balance is')) {
          errorToThrow = `You don't have enough funds! Please DM me to top up your balance...`;
        }

        return context.sendText(`Oh no!!! ${errorToThrow}`);
      }
      return context.sendText(
        `${utils.generateCongrats()} ${pickedMembers.map(
          (member: string) => `<@${member}>`
        )} you just received ${amount /
          pickedMembers.length} doge. ${utils.generateWow()}`
      );
    }
  );
};
