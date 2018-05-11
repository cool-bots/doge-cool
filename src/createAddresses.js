const {promisify} = require('util');

module.exports = (bot, blockIo) => {
  const getAddresses = promisify(blockIo.get_my_addresses_without_balances);
  const getNewAddress = promisify(blockIo.get_new_address);

  const createAddresses = async () => {
    const addressesResponse = await getAddresses({});
    const addresses = addressesResponse.data.addresses;
    console.log('addr', addresses);

    // const {members} = await bot.getAllUserList(); 
    const {members} = await bot.getAllConversationMembers('GANB38LD8');
    console.log('members', members);

    const existingLabels = addresses.map(a => a.label);

    const addresslessMembers = members.filter(m => !existingLabels.includes(m/*.id*/));

    console.log('noaddr', addresslessMembers);

    return Promise.all(addresslessMembers.map(m => getNewAddress({label: m/*.id*/})));
  };

  return createAddresses;
};
