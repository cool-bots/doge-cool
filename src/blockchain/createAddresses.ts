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
    const members = await bot.getAllConversationMembers('C032URY7X');
    const existingLabels = addresses.map((a: any) => a.label);
    const addresslessMembers = members.filter(
      (id: any) => !existingLabels.includes(id)
    );

    return Promise.all(
      addresslessMembers.map((id: any) => getNewAddress({ label: id }))
    );
  };

  return createAddresses;
};
