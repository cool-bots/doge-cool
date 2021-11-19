import getChannelMembers from './members';

// TODO Fix method name
const CreateAddresses = (bot: any, blockIo: any) => {
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
    const members = await getChannelMembers(
      bot,
      process.env.GENERAL_CHANNEL_ID!
    );

    const existingLabels = addresses.map((a: any) => a.label);
    const addresslessMembers = members.filter(
      (id: any) => !existingLabels.includes(id)
    );

    let tasks = [];
    for (let i = 0; i < addresslessMembers.length; i++) {
      const delay = 1500 * i;
      tasks.push(
        new Promise(async function(resolve) {
          await new Promise(res => setTimeout(res, delay));
          const result = getNewAddress({ label: addresslessMembers[i] });
          resolve(result);
        })
      );
    }

    return Promise.all(tasks);
  };

  return createAddresses;
};

export default CreateAddresses;
