const {blockIo} = require('./blockio');
const {slackClient} = require('./slackClient');

exports.createAddresses = async () => {
  const addressesResponse = await blockIo.getAddresses();
  const addresses = addressesResponse.data.addresses;
  console.log("addr", addresses);

  // const {members} = await bot.getAllUserList();
  const members = await slackClient.getAllConversationMembers("GANB38LD8");
  console.log("members", members);

  const existingLabels = addresses.map(a => a.label);

  const addresslessMembers = members.filter(
    m => !existingLabels.includes(m)
  );

  console.log("noaddr", addresslessMembers);

  return Promise.all(
    addresslessMembers.map(m => blockIo.getNewAddress({ label: m }))
  );
};
