const utils = require("../lib/utils");

exports.random = async (context, block_io, slackClient) => {
  const minCoins = 2;
  const userId = context.session.user.id;
  const channelId = context.session.channel.id;
  let members = await slackClient.getAllConversationMembers(channelId);
  let [, , amount] = context.event.text.split(" ");
  amount = Number(amount);

  // Remove the current user and the bot so it does not get a shower
  members = members.filter(
    member => member !== userId && member !== process.env.BOT_USER_ID
  );

  if (amount < minCoins) {
    await context.sendText(`Much sad! Not enough doge :( `);
  } else {
    const member = utils.getRandomArrayElements(members, 1);
    block_io.withdraw_from_labels(
      {
        from_labels: context.session.user.id,
        to_label: member,
        amount: amount,
        pin: process.env.BLOCK_IO_SECRET_PIN
      },
      async (error, data) => {
        console.log(data);
        if (error) return console.log("Error occured:", error.message);
        await context.sendText(
          `${utils.generateCongrats()} <Much luck! @${member}> you just received ${amount} doge. ${utils.generateWow()}`
        );
      }
    );
  }
};
