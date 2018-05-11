const BlockIo = require("block_io");

const blockIo = new BlockIo(
  process.env.BLOCK_IO_API_KEY,
  process.env.BLOCK_IO_SECRET_PIN,
  2
);

const promisify = fn => (...params) => new Promise((resolve, reject) => {
  fn(...params, (err, res) => {
    if (err) {
      return reject(err);
    }
    return resolve(res);
  });
});

exports.blockIo = {
  getAddresses: promisify(blockIo.get_my_addresses),
  getNewAddress: promisify(blockIo.get_new_address),
  getAddressByLabel: promisify(blockIo.get_address_by_label),
  withdrawFromLabels: promisify(blockIo.withdraw_from_labels)
};
