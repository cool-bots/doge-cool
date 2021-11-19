import { Context } from '../types/bottender';
import {
  generateWow,
  generateCongrats,
  getRandomArrayElements,
} from '../lib/utils';
import getChannelMembers from '../lib/members';
import { sendToAddress } from '../lib/sendToAddress';

const validateAmount = (amount: number | undefined) => amount && amount > 0;

const rain = async (context: Context, block_io: any, slackClient: any) => {
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

  const pickedMembers = getRandomArrayElements(filteredMembers, maxMembers);

  if (amount < pickedMembers.length * minCoinsPerMember) {
    return await context.sendText(`You are too stingy`);
  }

  console.log('the bot id', botId);
  console.log('the user id', userId);
  console.log('the members', pickedMembers.join());

  const toLabels = pickedMembers.join();
  const amountString = new Array(pickedMembers.length)
    .fill(amount / pickedMembers.length)
    .join();
  try {
    await sendToAddress(userId, toLabels, amountString);

    return context.sendText(
      `${generateCongrats()} ${pickedMembers.map(
        (member: string) => `<@${member}>`
      )} you just received ${amount /
        pickedMembers.length} doge. ${generateWow()}`
    );
  } catch (error) {
    let errorToThrow = error;

    if (error.message.includes('Maximum withdrawable balance is')) {
      errorToThrow = `You don't have enough funds! Please DM me to top up your balance...`;
    }

    return context.sendText(`Oh no!!! ${errorToThrow}`);
  }
};

export default rain;
