const utils = require("../lib/utils");

exports.rain = async (context, block_io, slackClient) => {
  const maxMembers = 5;
  const minCoins = 2;
  const userId = context.session.user.id;
  const channelId = context.session.channel.id;
  let members = await slackClient.getAllConversationMembers(channelId);
  let [, amount] = context.event.text.split(" ");
  amount = Number(amount);

  // Remove the current user and the bot so it does not get a shower
  members = members.filter(
    member => member !== userId && member !== process.env.SLACK_APP_ID
  );

  if (amount < minCoins) {
    await context.sendText(`Much sad! Not enough doge :( `);
  } else if (amount === minCoins || amount < members.length * 2) {
    const member = utils.getRandomArrayElements(members, 1);
    // TODO real send
    await context.sendText(
      `${utils.generateCongrats()} <@${member}> you just received ${amount} doge. ${utils.generateWow()}`
    );
  } else {
    console.log(",", members.length);
    if (members.length > maxMembers) {
      members = utils.getRandomArrayElements(members, 5);
    } else {
      members = utils.getRandomArrayElements(
        members,
        Math.round(members.length / 2)
      );
    }
    members.forEach(member => {
      // TODO send transaction
      console.log(member, amount / members.length);
    });
    await context.sendText(
      `${utils.generateCongrats()} ${members.map(
        member => `<@${member}>`
      )} you just received ${amount /
        members.length} doge. ${utils.generateWow()}`
    );
  }
};
