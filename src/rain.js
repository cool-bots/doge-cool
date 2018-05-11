const getRandomArrayElements = (arr, count) => {
  let shuffled = arr.slice(0),
    i = arr.length,
    min = i - count,
    temp,
    index;
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(min);
};

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
    await context.sendText(`No enough doge`);
  } else if (amount === minCoins || amount < members.length * 2) {
    const member = getRandomArrayElements(members, 1);
    // TODO real send
    await context.sendText(
      `Congratulations <@/${member}> you just received ${amount} doge`
    );
  } else {
    console.log(",", members.length);
    if (members.length > maxMembers) {
      members = getRandomArrayElements(members, 5);
    } else {
      members = getRandomArrayElements(members, Math.round(members.length / 2));
    }
    members.forEach(member => {
      // TODO send transaction
      console.log(member, amount / members.length);
    });
    await context.sendText(
      `Congratulations ${members.map(
        member => `<@/${member}>`
      )} you just received ${amount / members.length} doge`
    );
  }
};
