module.exports = (bot: any, blockIo: any) => {
  const getAddresses = () =>
    new Promise((resolve, reject) => {
      blockIo.get_my_addresses({}, (err: any, res: any) => {
        if (err) {
          return reject(err);
        }
        return resolve(res);
      });
    });

  const getNewAddress = (x: any) =>
    new Promise((resolve, reject) => {
      blockIo.get_new_address(x, (err: any, res: any) => {
        if (err) {
          return reject(err);
        }
        return resolve(res);
      });
    });

  const createAddresses = async () => {
    const addressesResponse: any = await getAddresses();
    const addresses = addressesResponse.data.addresses;
    // const {members} = await bot.getAllUserList();
    const members = await bot.getAllConversationMembers('GANB38LD8');
    const existingLabels = addresses.map((a: any) => a.label);
    const addresslessMembers = members.filter(
      (m: any) => !existingLabels.includes(m /*.id*/)
    );

    return Promise.all(
      addresslessMembers.map((m: any) => getNewAddress({ label: m /*.id*/ }))
    );
  };

  return createAddresses;
};
