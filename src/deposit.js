const { blockIo } = require('./blockio');

exports.deposit = async context => {
  try {
    const data = await blockIo.get_address_by_label(
      {
        label: context.session.user.id
      });
    await context.sendText(`I do not understand. ${data.data.address}`);
  } catch (e) {
    console.log("Error occured:", error.message);
  }
};
