const utils = require('../lib/utils');

const validateAmount = amount => amount && amount > 0;

exports.rain = async (context, block_io, slackClient) => {
  const maxMembers = 5;
  const minCoinsPerMember = 2;
  const userId = context.session.user.id;
  const botMemberId = process.env.BOT_CHANNEL_MEMBER_ID;
  const botId = process.env.BOT_USER_ID;
  const channelId = context.session.channel.id;
  const [, , rawAmount] = context.event.text.split(' ');
  const amount = Number(parseFloat(rawAmount));
  if (!validateAmount(amount)) {
    return await context.sendText(`:( Amount not valid`);
  }
  const members = await slackClient.getAllConversationMembers(channelId);
  const filteredMembers = members
    .filter(member => member !== userId)
    .filter(member => member !== botMemberId)
    .filter(member => member !== botId);

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
    async (error, data) => {
      // error.message
      if (error) {
        console.log(error);
        return await context.sendText(`Oh no!!! ${error.message}`);
      }
      return await context.sendText(
        `${utils.generateCongrats()} ${pickedMembers.map(
          member => `<@${member}>`
        )} you just received ${amount /
          pickedMembers.length} doge. ${utils.generateWow()}`
      );
    }
  );
};
