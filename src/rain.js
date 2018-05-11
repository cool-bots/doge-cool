const { blockIo } = require('./blockio');
const {slackClient} = require('./slackClient');

exports.rain = async context => {
  const maxMembers = 5;
  const minCoins = 2;
  const userId = context.session.user.id;
  const channelId = context.session.channel.id;
  let members = await slackClient.getAllConversationMembers(channelId);
  let [, amount] = context.event.text.split(" ");
  amount = Number(amount);

  // Remove the current user so it does not get a shower
  members = members.filter(member => member !== userId);

  if (amount === minCoins) {
    // send only to one
    // TODO pick one random user
  } else {
    console.log(",", members.length);
    if (members.length > maxMembers) {
      // TODO random
      members = members.splice(0, 5);
    } else {
      // TODO random
      members = members.splice(0, Math.round(members.length / 2));
    }

    if (amount < members.length * 2) {
      // TODO send message not enough to rain
    } else {
      members.forEach(member => {
        // TODO send transaction
        console.log(member, amount / members.length);
      });
      await context.sendText(
        `Congratulations ${members.map(
          member => `<@${member}>`
        )} you just received ${amount / members.length} doge`
      );
    }
  }
};
